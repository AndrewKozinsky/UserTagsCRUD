import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put,
	Req,
	Res,
	UseGuards
} from '@nestjs/common'
// import { Response } from 'express'
import UserService from './user.service'
import SignInDto from './dto/signIn.dto'
import LogInDto from './dto/logIn.dto'
// import { AuthGuard } from '../../common/auth.guard'
// import UpdateUserDto from './dto/updateUser.dto'
import { AppRequest } from '../../types/miscTypes'
// import AddTagIdsToUserDto from './dto/addTagIdsToUser.dto'
import {
	ApiBadRequestResponse,
	ApiCreatedResponse, ApiForbiddenResponse,
	ApiHeader,
	ApiNoContentResponse,
	ApiOperation,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger'
import { SignInCreatedResponse } from './responses/signIn.response'
import { WrongBodyResponse } from '../../types/wrongBody.response'
import { ForbiddenResponse } from '../../types/forbidden.response'



@ApiTags('User')
@Controller('')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('signin')
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({ summary: 'Регистрация (создание) пользователя' })
	@ApiCreatedResponse({
		description: 'Пользователь был создан',
		type: SignInCreatedResponse
	})
	@ApiBadRequestResponse({
		description: 'Предоставлены неправильные данные для создания пользователя',
		type: WrongBodyResponse
	})
	signIn(@Body() body: SignInDto): Promise<SignInCreatedResponse> {
		return this.userService.signIn(body)
	}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({
		summary: 'Вход пользователя',
		description: 'id пользователя определяется по токену'
	})
	logIn(@Req() request: AppRequest, @Body() body: LogInDto) {
		return this.userService.logIn(request, body)
	}

	// @Post('logout')
	// @HttpCode(HttpStatus.NO_CONTENT)
	/*@ApiOperation({
		summary: 'Выход пользователя',
		description: 'id пользователя определяется по токену'
	})*/
	/*logout(@Res() response: Response) {
		this.userService.logout(response)
	}*/

	// @UseGuards(AuthGuard)
	// @Get('user')
	// @HttpCode(HttpStatus.OK)
	/*@ApiOperation({
		summary: 'Получение данных пользователя',
		description: 'id пользователя определяется по токену'
	})*/
	/*getUser(@Req() request: AppRequest) {
		return this.userService.getUser(request)
	}*/

	// @UseGuards(AuthGuard)
	// @Put('user')
	// @HttpCode(HttpStatus.OK)
	/*@ApiOperation({
		summary: 'Обновление данных пользователя',
		description: 'id пользователя определяется по токену'
	})*/
	/*updateUser(@Req() request: AppRequest, @Body() body: UpdateUserDto) {
		return this.userService.updateUser(request, body)
	}*/

	// @UseGuards(AuthGuard)
	// @Delete('user')
	// @HttpCode(HttpStatus.NO_CONTENT)
	/*@ApiOperation({
		summary: 'Удаление пользователя (id определяется по токену)',
		description: 'id пользователя определяется по токену'
	})*/
	/*deleteUser(@Req() request: AppRequest, @Res() response: Response) {
		return this.userService.deleteUser(request, response)
	}*/

	@Delete('users')
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({ summary: 'Удаление всех пользователей' })
	@ApiNoContentResponse({
		description: 'Все пользователи удалены',
	})
	@ApiForbiddenResponse({
		description: 'Нет прав на этот маршрут',
		type: ForbiddenResponse
	})
	deleteUsers() {
		return this.userService.deleteUsers()
	}

	// @UseGuards(AuthGuard)
	// @Post('user/tag')
	// @HttpCode(HttpStatus.OK)
	/*@ApiOperation({
		summary: 'Добавление идентификаторов тегов пользователя к существующим',
		description: 'id пользователя определяется по токену'
	})*/
	/*addTagIdsToUser(@Req() request: AppRequest, updateUserDto: AddTagIdsToUserDto) {
		return this.userService.addTagIdsToUser(request, updateUserDto)
	}*/

	// @UseGuards(AuthGuard)
	// @Delete('user/tag/:id')
	// @HttpCode(HttpStatus.OK)
	/*@ApiOperation({
		summary: 'Удаление идентификатора тега пользователя из массива тегов',
		description: 'id пользователя определяется по токену'
	})*/
	/*deleteUserTag(@Req() request: AppRequest, @Param('id') id: number) {
		return this.userService.deleteUserTag(request, id)
	}*/

	// @UseGuards(AuthGuard)
	// @Get('user/tag/my')
	// @HttpCode(HttpStatus.OK)
	/*@ApiOperation({
		summary: 'Получение массива идентификаторов тегов пользователя',
		description: 'id пользователя определяется по токену'
	})*/
/*getMyTags(@Req() request: AppRequest) {
		return this.userService.getMyTags(request)
	}*/
}


