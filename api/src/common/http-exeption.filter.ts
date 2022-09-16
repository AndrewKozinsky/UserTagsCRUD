import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { Response } from 'express'
import { ResponseObjType } from '../types/responseTypes'

/** Фильтр обрабатывает HTTP-исключения и стандартные (непойманные) ошибки. */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
	/**
	 * Метод обрабатывающий ошибки возникающие при работе сервера
	 * @param {Object} exception — объект ошибки
	 * @param {Object} host — объект с методами взаимодействия с запросами и ответами
	 */
	catch(exception: HttpException | Error, host: ArgumentsHost) {
		const context = host.switchToHttp()
		const response = context.getResponse<Response>()

		let responseData: ResponseObjType.Fail | ResponseObjType.Error

		// Если выброшено контролируемое исключение
		if (exception instanceof HttpException) {
			responseData = this.handleHttpException(exception)
		}
		// Если возникла непойманная ошибка
		else {
			responseData = this.handleError(exception)
		}

		response.json(responseData)
	}

	/**
	 * Формирование ответа сервера на контролируемое исключение
	 * @param {Object} exception — объект ошибки
	 */
	handleHttpException(exception: HttpException): ResponseObjType.Fail {
		const statusCode = exception.getStatus()

		return {
			status: 'fail',
			statusCode,
			...exception.getResponse() as ResponseObjType.ErrorsGroup
		}
	}

	/**
	 * Формирование ответа сервера на непойманное исключение
	 * @param {Object} exception — объект ошибки
	 */
	handleError(exception: Error): ResponseObjType.Error {
		const workMode = process.env.NODE_ENV

		const message = ['development', 'test'].includes(workMode)
			? exception.message : 'Ошибка сервера.'

		return {
			status: 'error',
			statusCode: 500,
			message
		}
	}
}
