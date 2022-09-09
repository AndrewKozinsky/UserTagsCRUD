import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, Req, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'
import { UserService } from './user.service'
import SignInDto from './dto/signIn.dto'
import LogInDto from './dto/logIn.dto'
import { AuthGuard } from 'src/common/auth.guard'
import UpdateUserDto from './dto/updateUser.dto'
import { AppRequest } from '../../types/miscTypes'

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

	@Post('user/tag')
	createUserTag() {
		return {
			'tags': [
				{
					id: 1,
					name: 'example',
					sortOrder: '0'
				},
				{
					id: 2,
					name: 'example',
					sortOrder: '0'
				},
				{
					id: 3,
					name: 'example',
					sortOrder: '0'
				}
			]
		}
	}

	@Delete('user/tag/:id')
	deleteUserTag() {
		return {
			'tags': [
				{
					id: 1,
					name: 'example',
					sortOrder: '0'
				},
				{
					id: 2,
					name: 'example',
					sortOrder: '0'
				},
				{
					id: 3,
					name: 'example',
					sortOrder: '0'
				}
			]
		}
	}

	@Get('user/tag/my')
	getUserTags() {
		return {
			tags: [
				{
					id: 1,
					name: 'example',
					sortOrder: '0'
				},
				{
					id: 2,
					name: 'example',
					sortOrder: '0'
				},
				{
					id: 3,
					name: 'example',
					sortOrder: '0'
				}
			]
		}
	}
}
