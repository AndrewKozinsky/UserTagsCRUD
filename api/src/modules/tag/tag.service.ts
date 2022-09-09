import { Injectable } from '@nestjs/common'
import { PrismaClient, Tag } from '@prisma/client'
import { HelperService } from '../helper/helper.service'
import CreateTagDto from './dto/createTag.dto'

@Injectable()
export class TagService {
	constructor(
		private prismaClient: PrismaClient,
		private readonly helperService: HelperService
	) {}

	async createTag(createTagDto: CreateTagDto) {
		const createdTag = await this.helperService.runQuery<Tag>(() => {
			return this.prismaClient.tag.create({
				data: createTagDto
			})
		})

		return {
			id: createdTag.id,
			name: createdTag.name,
			sortOrder: createdTag.sortOrder
		}
	}

	// ======== Вспомогательные методы ========


}
