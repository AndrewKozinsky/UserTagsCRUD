import {
	Controller,
	Delete,
	HttpCode,
	HttpStatus,
	UseGuards
} from '@nestjs/common'
import { AuthGuard } from '../../common/auth.guard'
import { UserTagService } from './userTag.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('User tag')
@Controller('userTag')
export class UserTagController {
	constructor(private readonly userTagService: UserTagService) {}

	@UseGuards(AuthGuard)
	@Delete()
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({ summary: 'Удаление всех тегов' })
	deleteUserTags() {
		return this.userTagService.deleteUserTags()
	}
}
