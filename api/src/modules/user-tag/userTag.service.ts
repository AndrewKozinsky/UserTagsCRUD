import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
// import { UserTag } from '../../../prisma/client'
import UserTagRepository from './userTag.repository'

@Injectable()
export class UserTagService {
	constructor(
		private userTagRepository: UserTagRepository,
	) {}

	async deleteUserTags() {
		return this.userTagRepository.deleteAll()
	}


	// ======== Вспомогательные методы ========

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
