import { Repository } from '../../common/repository'
import { Inject, Injectable } from '@nestjs/common'
import { Prisma, PrismaClient, User } from '../../../prisma/client'
import { getHash } from '../../utils/miscUtils'

@Injectable()
export default class UserRepository extends Repository {
	constructor(
		@Inject('prismaClient') private prismaClient: PrismaClient,
	) {
		super()
	}

	async create(userData: User) {
		const hashedPassword = getHash(userData.password)

		const data = Object.assign(
			userData,
			{ password: hashedPassword }
		)

		return await this.run<User>(() => {
			return this.prismaClient.user.create({
				data
			})
		})
	}

	/**
	 * Получение пользователя из БД по переданным параметрам
	 * @param {Object} credentials — объект с параметрами пользователя которого нужно найти
	 */
	async get(credentials: Partial<User>) {
		const whereObj = { ...credentials }

		if (whereObj.password) {
			whereObj.password = getHash(whereObj.password)
		}

		return await this.run<null | User>(() => {
			return this.prismaClient.user.findFirst({
				where: whereObj
			})
		})
	}

	async deleteAll() {
		return await this.run<Prisma.BatchPayload>(() => {
			return this.prismaClient.user.deleteMany()
		})
	}
}
