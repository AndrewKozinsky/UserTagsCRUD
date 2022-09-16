import { Body, Controller, Post, Get, Put, UseGuards, Req, Param, HttpCode, HttpStatus, Query, Delete } from '@nestjs/common'
import { ApiCreatedResponse, ApiNoContentResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { TagService } from './tag.service'
// import CreateTagDto from './dto/createTag.dto'
import { AuthGuard } from '../../common/auth.guard'
import { SignInCreatedResponse } from '../user/responses/signIn.response'
// import { AppRequest } from '../../types/miscTypes'
// import UpdateTagDto from './dto/updateTag.dto'

// @ApiTags('Tag')
// @Controller('tag')
export class TagController {
	constructor(private readonly tagService: TagService) {}

	// @UseGuards(AuthGuard)
	// @Post('')
	// @HttpCode(HttpStatus.CREATED)
	/*@ApiOperation({
		summary: 'Создание тега',
		description: 'id пользователя, кому принадлежит тег, определяется по токену',
	})*/
	/*createTag(@Req() request: AppRequest, @Body() body: CreateTagDto) {
		return this.tagService.createTag(request, body)
	}*/

	// @UseGuards(AuthGuard)
	// @Get(':id')
	// @HttpCode(HttpStatus.OK)
	/*@ApiOperation({
		summary: 'Получение тега',
		description: 'Получить может только автор. id пользователя определяется по токену'
	})*/
	/*getTagById(@Param('id') id: number) {
		return this.tagService.getTagById(id)
	}*/

	// @UseGuards(AuthGuard)
	// @Get('')
	// @HttpCode(HttpStatus.OK)
	/*@ApiOperation({
		summary: 'Получение тегов созданных пользователем',
		description: 'id пользователя, кому принадлежит тег, определяется по токену'
	})*/
	/*getTags(@Query() query: {sortByOrder?: boolean, sortByName?: boolean, offset?: number, length?: number}) {
		return this.tagService.getTags(query)
	}*/

	// @UseGuards(AuthGuard)
	// @Put(':id')
	/*@ApiOperation({
		summary: '',
		description: 'id пользователя, кому принадлежит тег, определяется по токену'
	})*/
	/*updateTag(request: AppRequest, @Param('id') id: number, updateTagDto: UpdateTagDto) {
		return this.tagService.updateTag(request, id, updateTagDto)
	}*/

	// @UseGuards(AuthGuard)
	// @Delete(':id')
	// @HttpCode(HttpStatus.NO_CONTENT)
	/*@ApiOperation({
		summary: '',
		description: 'id пользователя, кому принадлежит тег, определяется по токену'
	})*/
	/*deleteTag(request: AppRequest, @Param('id') id: number) {
		return this.tagService.deleteTag(request, id)
	}*/

	@UseGuards(AuthGuard)
	@Delete()
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({
		summary: 'Удаление всех тегов',
		description: 'id пользователя, кому принадлежит тег, определяется по токену'
	})
	@ApiNoContentResponse({
		description: 'Все теги удалены'
	})
	deleteTags() {
		return this.tagService.deleteTags()
	}
}
