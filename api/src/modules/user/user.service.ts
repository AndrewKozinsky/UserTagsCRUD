import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { Prisma, PrismaClient, Tag, User } from '../../../prisma/client'
import { v4 as uuid } from 'uuid'
import { Response } from 'express'
import SignInDto from './dto/signIn.dto'
import { JwtPayload, sign, verify } from 'jsonwebtoken'
import LogInDto from './dto/logIn.dto'
// import UpdateUserDto from './dto/updateUser.dto'
import { AppRequest, JwtTokenPayloadType } from '../../types/miscTypes'
import { SignInCreatedResponse } from './responses/signIn.response'
// import AddTagIdsToUserDto from './dto/addTagIdsToUser.dto'
// import { UserTagService } from '../user-tag/userTag.service'
// import TagRepository from '../tag/tag.repository'
import UserRepository from './user.repository'
import UserTagRepository from '../user-tag/userTag.repository'
import { LogInOkResponse } from './responses/logIn.response'
// import { TagService } from '../tag/tag.service'

@Injectable()
export default class UserService {
	constructor(
		private userRepository: UserRepository,
		private readonly userTagRepository: UserTagRepository,
	) {}

	/**
	 * Обработчик /signin POST (регистрация пользователя)
	 * @param {Object} response — объект ответа
	 * @param {Object} signInDto — тело запроса
	 */
	async signIn(response: Response, signInDto: SignInDto): Promise<void> {
		const newUserData = await Object.assign(
			signInDto,
			{ uid: uuid() }
		)

		const createdUser = await this.userRepository.create(newUserData)

		await this.userTagRepository.create(createdUser.uid, [])

		const token = this.generateToken(createdUser)

		const body: SignInCreatedResponse = {
			token,
			expire: process.env.JWT_EXPIRE
		}

		response = this.setTokenCookieToResponse(response, token)
		response.status(HttpStatus.CREATED)
		response.send(body)
	}

	/**
	 * Обработчик /login POST (вход пользователя)
	 * @param {Object} request — объект запроса
	 * @param {Object} response — объект ответа
	 * @param {Object} logInDto — тело запроса
	 */
	async logIn(request: AppRequest, response: Response, logInDto: LogInDto) {
		const credentials = {
			email: logInDto.email,
			password: logInDto.password
		}

		const user = request.user || await this.userRepository.get(credentials)

		if (!user) {
			this.throwErrorUserIsNotFound('Пользователь не найден. Неправильная почта или пароль.')
		}

		const token = this.generateToken(user)

		const body: LogInOkResponse = {
			token,
			expire: process.env.JWT_EXPIRE
		}

		response = this.setTokenCookieToResponse(
			response, token, process.env.JWT_EXPIRE * 1000
		)
		response.status(HttpStatus.OK)
		response.send(body)
	}

	/**
	 * Выход пользователя
	 * @param {Object} response — объект ответа
	 */
	async logout(response: Response) {
		response = this.setTokenCookieToResponse(response, '', -1000)
		response.status(HttpStatus.NO_CONTENT)
		response.send()
	}

	/*async getUser(request: AppRequest) {
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
	}*/

	/*async updateUser(request: AppRequest, updateUserDto: UpdateUserDto) {
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
	}*/

	/*async deleteUser(request: AppRequest, response: Response) {
		const uid = request?.user?.uid

		await this.helperService.runQuery<User>(() => {
			return this.prismaClient.user.delete({
				where: {
					uid,
				}
			})
		})

		await this.logout(response)
	}*/

	/**
	 * Обработчик /users DELETE (удаление всех пользователей)
	 */
	async deleteUsers() {
		return await this.userRepository.deleteAll()
	}

	/*async addTagIdsToUser(request: AppRequest, updateUserDto: AddTagIdsToUserDto) {
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
	}*/

	/*async deleteUserTag(request: AppRequest, tagId: number) {
		const uid = request?.user?.uid as string
		await this.userTagService.deleteUserTag(uid, tagId)

		const newUserTags = await this.userTagService.getUserTags(uid)

		if (!newUserTags) {
			throw new HttpException({ message: 'Пользователь не найден' }, HttpStatus.BAD_REQUEST)
		}

		const userTags = await this.tagService.getTagsByIds(newUserTags.tagIds)

		return this.shapeUserTags(userTags)
	}*/

	/*async getMyTags(request: AppRequest) {
		const uid = request?.user?.uid as string
		const userTagIds = await this.userTagService.getUserTags(uid)

		if (!userTagIds) {
			throw new HttpException({ message: 'Пользователь не найден' }, HttpStatus.BAD_REQUEST)
		}

		const userTags = await this.tagService.getTagsByIds(userTagIds.tagIds)

		return this.shapeUserTags(userTags)
	}*/


	// ======== Вспомогательные методы ========

	/**
	 * Генерирует токен авторизации
	 * @param {Object} user — данные пользователя
	 */
	generateToken(user: User): string {
		const payload: JwtTokenPayloadType = { uid: user.uid }

		return sign(
			payload,
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRE }
		)
	}

	/**
	 * Получение строки с токеном авторизации из кук или заголовка authorization
	 * @param {Object} request — объект запроса
	 */
	getTokenFromRequest(request: AppRequest) {
		const token: string = request.cookies?.token || request.headers?.authorization?.split(' ')[1]

		return token || ''
	}

	/**
	 * Получение идентификатора пользователя из токена
	 * @param {String} token — токен авторизации
	 */
	async extractUserUidFromToken(token: string): Promise<string | null> {
		try {
			const decodedJWT = await verify(token, process.env.JWT_SECRET) as JwtPayload
			return decodedJWT.uid as string
		}
		catch (error) {
			return ''
		}
	}

	/**
	 * Функция выбрасывает ошибку
	 * @param {String} message — сообщение об ошибке
	 */
	throwErrorUserIsNotFound(message = 'Пользователь не найден.'): never {
		throw new HttpException(
			{ message },
			HttpStatus.BAD_REQUEST
		)
	}

	/**
	 * Ставит в объект ответа куку строки токена
	 * @param {Object} response — объект ответа
	 * @param {String} token — строка токена
	 * @param {Number} expires — срок действия куки прибавляемый к текущей дате
	 */
	setTokenCookieToResponse(response: Response, token = '', expires = 0): Response {
		const cookieOptions = {
			expires: new Date(Date.now() + expires)
		}
		response.cookie('token', token, cookieOptions)


		const cookieOptions2 = {
			expires: new Date(Date.now() + expires)
		}
		response.cookie('test', token, cookieOptions2)

		return response
	}

	/*shapeUserTags(userTags: Tag[]) {
		return {
			tags: userTags.map(tag => this.shapeUserTag(tag))
		}
	}*/

/*shapeUserTag(userTag: Tag) {
		return {
			id: userTag.id,
			name: userTag.name,
			sortOrder: userTag.sortOrder
		}
	}*/
}
