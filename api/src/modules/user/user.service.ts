import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaClient, User } from 'prisma/client'
import { v4 as uuid } from 'uuid'
import { Response } from 'express'
import { HelperService } from '../helper/helper.service'
import SignInDto from './dto/signIn.dto'
import { getHash } from '../../utils/miscUtils'
import { JwtPayload, sign, verify } from 'jsonwebtoken'
import LogInDto from './dto/logIn.dto'
import UpdateUserDto from './dto/updateUser.dto'
import { AppRequest, JwtTokenPayloadType } from '../../types/miscTypes'

@Injectable()
export class UserService {
	constructor(
		private prismaClient: PrismaClient,
		private readonly helperService: HelperService
	) {}

	async signIn(signInDto: SignInDto) {
		const newUserData = await this.createUserDataFromSignInDto(signInDto)

		const createdUser = await this.helperService.runQuery<User>(() => {
			return this.prismaClient.user.create({
				data: newUserData
			})
		})

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

		if (!request.user) {
			throw new HttpException({
				message: 'Пользователь не найден. Неправильная почта или пароль.'
			}, HttpStatus.BAD_REQUEST)
		}

		return {
			token: this.generateToken(request.user),
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
			throw new HttpException({
				message: 'Пользователь не найден.'
			}, HttpStatus.BAD_REQUEST)
		}

		return {
			email: user.email,
			nickname: user.nickname,
			tags: [
				{
					'id': 'id',
					'name': 'example',
					'sortOrder': '0'
				}
			]
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
			new HttpException('Токен авторизации не прошёл проверку.', HttpStatus.BAD_REQUEST)
		}

		return ''
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
}
