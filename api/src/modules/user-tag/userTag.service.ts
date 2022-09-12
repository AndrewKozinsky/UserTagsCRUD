import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaClient, UserTag } from '../../../prisma/client'
import { HelperService } from '../helper/helper.service'

@Injectable()
export class UserTagService {
	constructor(
		private prismaClient: PrismaClient,
		private readonly helperService: HelperService
	) {}


	// ======== Вспомогательные методы ========

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

	async replaceUserTagsArr(userId: string, userTagIds: number[]) {
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
	}

	async getUserTags(userId: string) {
		return await this.helperService.runQuery<UserTag | null>(() => {
			return this.prismaClient.userTag.findFirst({
				where: {
					userId,
				}
			})
		})
	}

	async deleteUserTag(userId: string, tagIdForDeletion: number) {
		const userTags = await this.getUserTags(userId)

		if (!userTags) {
			throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST)
		}

		const newTagIds = userTags.tagIds.filter(tag => tag !== tagIdForDeletion)

		return await this.replaceUserTagsArr(userId, newTagIds)
	}
}
