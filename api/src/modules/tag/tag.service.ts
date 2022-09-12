import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { HelperService } from '../helper/helper.service'
import CreateTagDto from './dto/createTag.dto'
import { AppRequest } from '../../types/miscTypes'
import { PrismaClient, Tag, User } from 'prisma/client'
import UpdateTagDto from './dto/updateTag.dto'

@Injectable()
export class TagService {
	constructor(
		private prismaClient: PrismaClient,
		private readonly helperService: HelperService
	) {}

	async createTag(request: AppRequest, createTagDto: CreateTagDto) {
		const newTagData = await this.createTagDataFromCreateTagDto(request, createTagDto)

		const createdTag = await this.helperService.runQuery<Tag>(() => {
			return this.prismaClient.tag.create({
				data: newTagData
			})
		})

		return {
			id: createdTag.id,
			name: createdTag.name,
			sortOrder: createdTag.sortOrder
		}
	}

	async getTagById(tagId: number) {
		const fullTag = await this.getFullTag(tagId)

		if (!fullTag) {
			throw new HttpException('Не найден тег с переданным id.', HttpStatus.BAD_REQUEST)
		}

		return {
			creator: {
				nickname: fullTag.User.nickname,
				uid: fullTag.User.uid
			},
			name: fullTag.name,
			sortOrder: fullTag.sortOrder
		}
	}

	async getTags(query: {sortByOrder?: boolean, sortByName?: boolean, offset?: number, length?: number}) {
		const { sortByOrder = false, sortByName = false, offset = 10, length = 10 } = query

		const orderByFields: {sortOrder?:'asc', name?:'asc'} = {}
		if (sortByOrder) orderByFields.sortOrder = 'asc'
		if (sortByName) orderByFields.name = 'asc'

		const tags = await this.helperService.runQuery<(Tag & { User: User})[] | null>(() => {
			return this.prismaClient.tag.findMany({
				include: {
					User: true
				},
				orderBy: orderByFields,
				take: length,
				skip: offset,
			})
		})

		const allTagsCount = (await this.prismaClient.tag.count).length

		if (!tags) {
			return this.formGetTagsReturnValue([], offset, length, allTagsCount)
		}

		return this.formGetTagsReturnValue(tags, offset, length, allTagsCount)
	}

	async updateTag(request: AppRequest, tagId: number, updateTagDto: UpdateTagDto) {
		const fullTag = await this.getFullTag(tagId)

		if (!fullTag) {
			throw new HttpException('Не найден тег с переданным id.', HttpStatus.BAD_REQUEST)
		}

		if (fullTag.User.uid !== request.user?.uid) {
			throw new HttpException('Пользователь не создавал тег с переданным идентификатором"', HttpStatus.BAD_REQUEST)
		}

		const updatedTag = await this.helperService.runQuery<Tag & { User: User}>(() => {
			return this.prismaClient.tag.update({
				where: {
					id: tagId,
				},
				data: updateTagDto,
				include: {
					User: true
				}
			})
		})

		return {
			creator: {
				nickname: updatedTag.User.nickname,
				uid: updatedTag.User.uid
			},
			name: updatedTag.name,
			sortOrder: updatedTag.sortOrder
		}
	}

	async deleteTag(request: AppRequest, tagId: number) {
		const fullTag = await this.getFullTag(tagId)

		if (!fullTag) {
			throw new HttpException('Не найден тег с переданным id.', HttpStatus.BAD_REQUEST)
		}

		if (fullTag.User.uid !== request.user?.uid) {
			throw new HttpException('Пользователь не создавал тег с переданным идентификатором"', HttpStatus.BAD_REQUEST)
		}

		await this.helperService.runQuery<Tag>(() => {
			return this.prismaClient.tag.delete({
				where: {
					id: tagId,
				}
			})
		})
	}


	// ======== Вспомогательные методы ========

	createTagDataFromCreateTagDto(request: AppRequest, createTagDto: CreateTagDto) {
		const userId = request.user?.uid as string
		return Object.assign(createTagDto, { userId } )
	}

	async getFullTag(tagId: number) {
		return await this.helperService.runQuery<Tag & { User: User} | null>(() => {
			return this.prismaClient.tag.findFirst({
				where: {
					id: tagId
				},
				include: {
					User: true
				}
			})
		})
	}

	async getTagsByIds(tagIds: number[]) {
		return await this.helperService.runQuery<Tag[]>(() => {
			return this.prismaClient.tag.findMany({
				where: {
					id: { in: tagIds }
				}
			})
		})
	}

	private formGetTagsReturnValue(tags: (Tag & {User: User})[], offset: number, length: number, quantity: number) {
		const data = tags.map(tag => {
			return {
				creator: {
					nickname: tag.User.nickname,
					uid: tag.User.uid
				},
				name: tag.name,
				sortOrder: tag.sortOrder
			}
		})

		return {
			data,
			meta: {
				offset,
				length,
				quantity
			}
		}
	}
}
