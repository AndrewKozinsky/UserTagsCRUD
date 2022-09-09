import { Body, Controller, Post, Get, Put } from '@nestjs/common'
import { TagService } from './tag.service'
import CreateTagDto from './dto/createTag.dto'

@Controller('tag')
export class TagController {
	constructor(private readonly tagService: TagService) {}

	@Post('')
	createTag(@Body() body: CreateTagDto) {
		return this.tagService.createTag(body)
	}

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
	}

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
	}

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
	}

	@Put(':id')
	deleteTag() {

	}
}
