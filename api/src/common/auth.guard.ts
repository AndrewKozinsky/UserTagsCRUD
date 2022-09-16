import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ResponseObjType } from '../types/responseTypes'

/**
 * Стражник проверяет, что в запросе есть объект user.
 * Это будет означать, что такой пользователь существует и он передал корректный JWT.
 */
@Injectable()
export class AuthGuard implements CanActivate {

	/**
	 * Метод вызываемый перед тем как запрос дойдёт до обработчика.
	 * Проверяет наличие свойства user в объекте запроса. В объекте должны быть данные об авторизованном пользователе.
	 * @param {Object} context — контекст выполнения программы
	 */
	async canActivate(context: ExecutionContext): Promise<true> | never {
		const ctx = context.switchToHttp()
		const request = ctx.getRequest()

		if (request.user) {
			return true
		}

		this.throwDoNotAllowException()
	}

	/**
	 * Метод выбрасывает ошибку если пользователь запрашивает маршрут доступный авторизованным пользователям,
	 * но в запросе не передан правильный JWT
	 */
	throwDoNotAllowException(): never {
		const errorBody: ResponseObjType.ErrorsGroup = {
			message: 'У вас нет права доступа к этому маршруту',
		}
		throw new HttpException(
			errorBody,
			HttpStatus.UNAUTHORIZED
		)
	}
}
