import { Body, Controller, Post, Get, Put, UseGuards, Req } from '@nestjs/common'
import { TagService } from './tag.service'
import CreateTagDto from './dto/createTag.dto'
import { AuthGuard } from '../../common/auth.guard'
import { AppRequest } from '../../types/miscTypes'

@Controller('tag')
export class TagController {
	constructor(private readonly tagService: TagService) {}

	@UseGuards(AuthGuard)
	@Post('')
	createTag(@Req() request: AppRequest, @Body() body: CreateTagDto) {
		return this.tagService.createTag(request, body)
	}

	/*@UseGuards(AuthGuard)
	@Get(':id')
	getTag() {
		return {
			'creator': {
				'nickname': 'example',
				'uid': 'exam-pl-eUID'
			},
			'name': 'example',
			'sortOrder': '0'
		}
	}*/

	/*@UseGuards(AuthGuard)
	@Get('')
	getTags() {
		return {
			'data': [
				{
					'creator': {
						'nickname': 'example',
						'uid': 'exam-pl-eUID'
					},
					'name': 'example',
					'sortOrder': '0'
				},
				{
					'creator': {
						'nickname': 'example',
						'uid': 'exam-pl-eUID'
					},
					'name': 'example',
					'sortOrder': '0'
				}
			],
			'meta': {
				'offset': 10,
				'length': 10,
				'quantity': 100
			}
		}
	}*/

	/*@UseGuards(AuthGuard)
	@Put(':id')
	updateTag() {
		return {
			'creator': {
				'nickname': 'example',
				'uid': 'exam-pl-eUID'
			},
			'name': 'example',
			'sortOrder': '0'
		}
	}*/

	/*@UseGuards(AuthGuard)
	@Put(':id')
	deleteTag() {

	}*/
}
