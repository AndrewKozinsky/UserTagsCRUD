import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'

/** Перехватчик отправляет заголовки позволяющие запросы с любого хоста */
@Injectable()
export class CorsInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const ctx = context.switchToHttp()
		const response = ctx.getResponse()

		response.setHeader('Access-Control-Allow-Origin', '*')
		response.setHeader('Access-Control-Allow-Methods', '*')

		return next.handle()
	}
}
