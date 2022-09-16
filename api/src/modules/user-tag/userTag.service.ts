import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { Prisma, PrismaClient, UserTag } from '../../../prisma/client'
import { HelperService } from '../helper/helper.service'

// @Injectable()
export class UserTagService {
	constructor(
		@Inject('prismaClient') private prismaClient: PrismaClient,
		private readonly helperService: HelperService
	) {}

	/*async deleteUserTags() {
		return await this.helperService.runQuery<Prisma.BatchPayload>(() => {
			return this.prismaClient.userTag.deleteMany()
		})
	}*/


	// ======== Вспомогательные методы ========

	/**
	 * Создаёт в БД ряд таблицы с идентификатором пользователя и массивом идентификаторов тегов выбранные пользователем
	 * @param {String} userId — id пользователя
	 * @param {Array} userTagIds — массив идентификаторов тегов
	 */
	async createUserTags(userId: string, userTagIds: number[]) {
		await this.helperService.runQuery<UserTag>(() => {
			return this.prismaClient.userTag.create({
				data: {
					userId,
					tagIds: userTagIds
				}
			})
		})
	}

	/*async replaceUserTagsArr(userId: string, userTagIds: number[]) {
		return await this.helperService.runQuery<UserTag | null>(() => {
			return this.prismaClient.userTag.update({
				where: {
					userId: userId
				},
				data: {
					tagIds: userTagIds
				}
			})
		})
	}*/

	/*async getUserTags(userId: string) {
		return await this.helperService.runQuery<UserTag | null>(() => {
			return this.prismaClient.userTag.findFirst({
				where: {
					userId,
				}
			})
		})
	}*/

	/*async deleteUserTag(userId: string, tagIdForDeletion: number) {
		const userTags = await this.getUserTags(userId)

		if (!userTags) {
			throw new HttpException({ message: 'Пользователь не найден' }, HttpStatus.BAD_REQUEST)
		}

		const newTagIds = userTags.tagIds.filter(tag => tag !== tagIdForDeletion)

		return await this.replaceUserTagsArr(userId, newTagIds)
	}*/
}
