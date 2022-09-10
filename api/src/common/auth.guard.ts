import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common'

/**
 * Стражник проверяет, что запрос сделал пользователь с правильным JWT.
 */
@Injectable()
export class AuthGuard implements CanActivate {

	async canActivate(context: ExecutionContext): Promise<true> | never {
		const ctx = context.switchToHttp()
		const request = ctx.getRequest()

		if (request.user) {
			return true
		}

		this.throwDoNotAllowException()
	}

	throwDoNotAllowException(): never {
		throw new HttpException({
			message: 'У вас нет права доступа к этому маршруту',
		}, HttpStatus.BAD_REQUEST)
	}
}
