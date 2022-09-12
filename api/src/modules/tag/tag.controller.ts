import { Body, Controller, Post, Get, Put, UseGuards, Req, Param, HttpCode, HttpStatus, Query } from '@nestjs/common'
import { TagService } from './tag.service'
import CreateTagDto from './dto/createTag.dto'
import { AuthGuard } from '../../common/auth.guard'
import { AppRequest } from '../../types/miscTypes'
import UpdateTagDto from './dto/updateTag.dto'

@Controller('tag')
export class TagController {
	constructor(private readonly tagService: TagService) {}

	@UseGuards(AuthGuard)
	@Post('')
	@HttpCode(HttpStatus.CREATED)
	createTag(@Req() request: AppRequest, @Body() body: CreateTagDto) {
		return this.tagService.createTag(request, body)
	}

	@UseGuards(AuthGuard)
	@Get(':id')
	@HttpCode(HttpStatus.OK)
	getTagById(@Param('id') id: number) {
		return this.tagService.getTagById(id)
	}

	@UseGuards(AuthGuard)
	@Get('')
	@HttpCode(HttpStatus.OK)
	getTags(@Query() query: {sortByOrder?: boolean, sortByName?: boolean, offset?: number, length?: number}) {
		return this.tagService.getTags(query)
	}

	@UseGuards(AuthGuard)
	@Put(':id')
	updateTag(request: AppRequest, @Param('id') id: number, updateTagDto: UpdateTagDto) {
		return this.tagService.updateTag(request, id, updateTagDto)
	}

	@UseGuards(AuthGuard)
	@Put(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	deleteTag(request: AppRequest, @Param('id') id: number) {
		this.tagService.deleteTag(request, id)
	}
}
