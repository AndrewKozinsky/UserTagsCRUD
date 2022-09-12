import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'
import { UserService } from './user.service'
import SignInDto from './dto/signIn.dto'
import LogInDto from './dto/logIn.dto'
import { AuthGuard } from 'src/common/auth.guard'
import UpdateUserDto from './dto/updateUser.dto'
import { AppRequest } from '../../types/miscTypes'
import AddTagIdsToUserDto from './dto/addTagIdsToUser.dto'

@Controller('')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('signin')
	@HttpCode(HttpStatus.CREATED)
	signIn(@Body() body: SignInDto) {
		return this.userService.signIn(body)
	}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	logIn(@Req() request: AppRequest, @Body() body: LogInDto) {
		return this.userService.logIn(request, body)
	}

	@Post('logout')
	@HttpCode(HttpStatus.NO_CONTENT)
	logout(@Res() response: Response) {
		this.userService.logout(response)
	}

	@UseGuards(AuthGuard)
	@Get('user')
	@HttpCode(HttpStatus.OK)
	getUser(@Req() request: AppRequest) {
		return this.userService.getUser(request)
	}

	@UseGuards(AuthGuard)
	@Put('user')
	@HttpCode(HttpStatus.OK)
	updateUser(@Req() request: AppRequest, @Body() body: UpdateUserDto) {
		return this.userService.updateUser(request, body)
	}

	@UseGuards(AuthGuard)
	@Delete('user')
	@HttpCode(HttpStatus.NO_CONTENT)
	deleteUser(@Req() request: AppRequest, @Res() response: Response) {
		this.userService.deleteUser(request, response)
	}

	@UseGuards(AuthGuard)
	@Post('user/tag')
	@HttpCode(HttpStatus.OK)
	addTagIdsToUser(@Req() request: AppRequest, updateUserDto: AddTagIdsToUserDto) {
		return this.userService.addTagIdsToUser(request, updateUserDto)
	}

	@UseGuards(AuthGuard)
	@Delete('user/tag/:id')
	@HttpCode(HttpStatus.OK)
	deleteUserTag(@Req() request: AppRequest, @Param('id') id: number) {
		return this.userService.deleteUserTag(request, id)
	}

	@UseGuards(AuthGuard)
	@Get('user/tag/my')
	@HttpCode(HttpStatus.OK)
	getMyTags(@Req() request: AppRequest) {
		return this.userService.getMyTags(request)
	}
}
