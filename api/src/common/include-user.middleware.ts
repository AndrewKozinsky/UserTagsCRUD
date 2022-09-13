import { Injectable, NestMiddleware } from '@nestjs/common'
import { UserService } from '../modules/user/user.service'

@Injectable()
export class IncludeUserMiddleware implements NestMiddleware {
	constructor(private readonly userService: UserService) {}

	/**
	 * Промежуточная функция срабатываемая до попадания запроса к стражнику и обработчику запроса.
	 * Проверяет наличие токена авторизации.
	 * И если есть, то находит пользователя по зашитому id и ставит его данные в свойство user объекта запроса.
	 * @param {Object} req — объект запроса
	 * @param {Object} res — объект ответа
	 * @param {Function} next — функция передающая запрос следующему обработчику
	 */
	async use(req: any, res: any, next: () => void) {
		const token = this.userService.getTokenFromRequest(req)
		if (!token || token == '') {
			next()
			return
		}

		const userId = await this.userService.extractUserUidFromToken(token)
		if (!userId) {
			next()
			return
		}

		const user = await this.userService.getUserByCredentials({ uid: userId })
		if (user) req.user = user

		next()
	}
}
