import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaClient, Tag, User } from 'prisma/client'
import { v4 as uuid } from 'uuid'
import { Response } from 'express'
import { HelperService } from '../helper/helper.service'
import SignInDto from './dto/signIn.dto'
import { getHash } from '../../utils/miscUtils'
import { JwtPayload, sign, verify } from 'jsonwebtoken'
import LogInDto from './dto/logIn.dto'
import UpdateUserDto from './dto/updateUser.dto'
import { AppRequest, JwtTokenPayloadType } from '../../types/miscTypes'
import AddTagIdsToUserDto from './dto/addTagIdsToUser.dto'
import { UserTagService } from '../user-tag/userTag.service'
import { TagService } from '../tag/tag.service'

@Injectable()
export class UserService {
	constructor(
		private prismaClient: PrismaClient,
		private readonly helperService: HelperService,
		private readonly userTagService: UserTagService,
		private readonly tagService: TagService
	) {}

	async signIn(signInDto: SignInDto) {
		const newUserData = await this.createUserDataFromSignInDto(signInDto)

		const createdUser = await this.helperService.runQuery<User>(() => {
			return this.prismaClient.user.create({
				data: newUserData
			})
		})

		await this.userTagService.createUserTags(createdUser.uid, [])

		return {
			token: this.generateToken(createdUser),
			expires: process.env.JWT_EXPIRES
		}
	}

	async logIn(request: AppRequest, logInDto: LogInDto) {
		const credentials = {
			email: logInDto.email,
			password: logInDto.password
		}

		const user = request.user || await this.getUserByCredentials(credentials)

		if (!user) {
			this.throwErrorUserIsNotFound('Пользователь не найден. Неправильная почта или пароль.')
		}

		return {
			token: this.generateToken(user),
			expires: process.env.JWT_EXPIRES
		}
	}

	async logout(response: Response) {
		const cookieOptions = {
			expires: new Date(Date.now())
		}
		response.cookie('token', '', cookieOptions)
		response.status(HttpStatus.NO_CONTENT)
		response.send()
	}

	async getUser(request: AppRequest) {
		const { user } = request

		if (!user) {
			this.throwErrorUserIsNotFound()
		}

		const fullUser = await this.helperService.runQuery<User & { Tags: Tag[]} | null>(() => {
			return this.prismaClient.user.findFirst({
				where: {
					uid: user.uid
				},
				include: {
					Tags: true
				}
			})
		})

		if (!fullUser) {
			this.throwErrorUserIsNotFound()
		}

		const tags = fullUser.Tags.map(tag => {
			return {
				id: tag.id,
				name: tag.name,
				sortOrder: tag.sortOrder
			}
		})

		return {
			email: fullUser.email,
			nickname: fullUser.nickname,
			tags
		}
	}

	async updateUser(request: AppRequest, updateUserDto: UpdateUserDto) {
		const uid = request?.user?.uid

		const updatedUser = await this.helperService.runQuery<User>(() => {
			return this.prismaClient.user.update({
				where: {
					uid,
				},
				data: updateUserDto
			})
		})

		return {
			email: updatedUser.email,
			nickname: updatedUser.nickname
		}
	}

	async deleteUser(request: AppRequest, response: Response) {
		const uid = request?.user?.uid

		await this.helperService.runQuery<User>(() => {
			return this.prismaClient.user.delete({
				where: {
					uid,
				}
			})
		})

		await this.logout(response)
	}

	async addTagIdsToUser(request: AppRequest, updateUserDto: AddTagIdsToUserDto) {
		const uid = request?.user?.uid as string

		const userCurrentTags = await this.userTagService.getUserTags(uid)

		// Соединение присланных идентификаторов и существующих тегов. Возможно есть дублирующиеся значения
		const tagIdsWithDuplicates = updateUserDto.tags.concat(userCurrentTags?.tagIds || [])

		// Очистка массива идентификаторов тегов от дублирующихся значений.
		// Возможно некоторых тегов с переданным идентификатором не существует.
		const tagIdsUntidy = [...new Set(tagIdsWithDuplicates)]

		// Получение существующих тегов перечисленных в tagIdsUntidy
		const existingTags = await this.tagService.getTagsByIds(tagIdsUntidy)

		const userTagIds: number[] = existingTags.map(tag => tag.id)

		await this.userTagService.replaceUserTagsArr(uid, userTagIds)

		return this.shapeUserTags(existingTags)
	}

	async deleteUserTag(request: AppRequest, tagId: number) {
		const uid = request?.user?.uid as string
		await this.userTagService.deleteUserTag(uid, tagId)

		const newUserTags = await this.userTagService.getUserTags(uid)

		if (!newUserTags) {
			throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST)
		}

		const userTags = await this.tagService.getTagsByIds(newUserTags.tagIds)

		return this.shapeUserTags(userTags)
	}

	async getMyTags(request: AppRequest) {
		const uid = request?.user?.uid as string
		const userTagIds = await this.userTagService.getUserTags(uid)

		if (!userTagIds) {
			throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST)
		}

		const userTags = await this.tagService.getTagsByIds(userTagIds.tagIds)

		return this.shapeUserTags(userTags)
	}


	// ======== Вспомогательные методы ========

	createUserDataFromSignInDto(signInDto: SignInDto): User {
		const hashedPassword = getHash(signInDto.password)

		return Object.assign(
			signInDto,
			{ uid: uuid(), password: hashedPassword }
		)
	}

	generateToken(user: User): string {
		const payload: JwtTokenPayloadType = { uid: user.uid }

		return sign(
			payload,
			process.env.JWT_SECRET,
			{ expiresIn: +process.env.JWT_EXPIRES }
		)
	}

	getTokenFromRequest(request: AppRequest) {
		const token: string = request.cookies?.token || request.headers?.authorization?.split(' ')[1]

		return token || ''
	}

	async extractUserUidFromToken(token: string): Promise<string> | never {
		try {
			const decodedJWT = await verify(token, process.env.JWT_SECRET) as JwtPayload
			return decodedJWT.uid as string
		}
		catch (error) {
			throw new HttpException('Токен авторизации не прошёл проверку.', HttpStatus.BAD_REQUEST)
		}
	}

	async getUserByCredentials(credentials: Partial<User>) {
		const whereObj = { ...credentials }

		if (whereObj.password) {
			whereObj.password = getHash(whereObj.password)
		}

		return await this.helperService.runQuery<null | User>(() => {
			return this.prismaClient.user.findFirst({
				where: whereObj
			})
		})
	}

	throwErrorUserIsNotFound(message = 'Пользователь не найден.'): never {
		throw new HttpException({
			message
		}, HttpStatus.BAD_REQUEST)
	}

	shapeUserTags(userTags: Tag[]) {
		return {
			tags: userTags.map(tag => this.shapeUserTag(tag))
		}
	}

	shapeUserTag(userTag: Tag) {
		return {
			id: userTag.id,
			name: userTag.name,
			sortOrder: userTag.sortOrder
		}
	}
}
