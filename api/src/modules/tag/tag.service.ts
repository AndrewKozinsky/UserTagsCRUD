import { Injectable } from '@nestjs/common'
import { HelperService } from '../helper/helper.service'
import CreateTagDto from './dto/createTag.dto'
import { AppRequest } from '../../types/miscTypes'
import { PrismaClient, Tag } from 'prisma/client'

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

	// ======== Вспомогательные методы ========

	createTagDataFromCreateTagDto(request: AppRequest, createTagDto: CreateTagDto) {
		const userId = request.user?.uid as string
		return Object.assign(createTagDto, { userId } )
	}
}
