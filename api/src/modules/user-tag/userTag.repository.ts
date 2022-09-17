import { Repository } from '../../common/repository'
import { Inject, Injectable } from '@nestjs/common'
import { Prisma, PrismaClient, UserTag } from '../../../prisma/client'

@Injectable()
export default class UserTagRepository extends Repository {
	constructor(
		@Inject('prismaClient') private prismaClient: PrismaClient
	) {
		super()
	}

	/**
	 * Создаёт в БД ряд таблицы с идентификатором пользователя и массивом идентификаторов тегов выбранные пользователем
	 * @param {String} userId — id пользователя
	 * @param {Array} userTagIds — массив идентификаторов тегов
	 */
	async create(userId: string, userTagIds: number[]) {
		await this.run<UserTag>(() => {
			return this.prismaClient.userTag.create({
				data: {
					userId,
					tagIds: userTagIds
				}
			})
		})
	}

	async deleteAll() {
		return await this.run<Prisma.BatchPayload>(() => {
			return this.prismaClient.userTag.deleteMany()
		})
	}
}
