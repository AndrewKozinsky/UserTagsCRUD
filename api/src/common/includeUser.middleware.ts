import { Injectable, NestMiddleware } from '@nestjs/common'
import { UserService } from '../modules/user/user.service'

@Injectable()
export class IncludeUserMiddleware implements NestMiddleware {
	constructor(private readonly userService: UserService) {}

	async use(req: any, res: any, next: () => void) {
		const token = this.userService.getTokenFromRequest(req)
		if (!token || token == '') {
			next()
			return
		}

		const userUid = await this.userService.extractUserUidFromToken(token)
		if (!userUid) {
			next()
			return
		}

		const user = await this.userService.getUserByCredentials({ uid: userUid })
		if (user) req.user = user

		next()
	}
}
