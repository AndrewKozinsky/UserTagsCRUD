import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaClientKnownRequestError } from 'prisma/client/runtime'

/**
 * Класс с различными методами используемые на всём приложении
 */
@Injectable()
export class HelperService {

	/**
	 * Метод запускает функцию с методом Призмы. Например, для записи сущности в таблицу БД.
	 * При появлении ошибки будет выброшено исключение.
	 * @param queryFn
	 */
	async runQuery<T>(queryFn: () => Promise<T>): Promise<T | never> {
		try {
			return await queryFn()
		}
		catch(err) {

			// Типы ошибок Призмы описаны в prisma.io/docs/reference/api-reference/error-reference
			if (err instanceof PrismaClientKnownRequestError) {
				if (err.code === 'P2002' && err.meta) {
					throw new HttpException({
						message: 'Поля тела запроса содержат ошибки',
						fieldsErrors: {
							[err.meta.target as string]: ['Значение поля должно быть уникальным.']
						}
					}, HttpStatus.BAD_REQUEST)
				}
				else if (err.code === 'P2025' && err.meta) {
					throw new HttpException({
						message: 'Сущность не найдена.'
					}, HttpStatus.BAD_REQUEST)
				}
				else {
					console.log(err)
					throw new HttpException({
						message: 'Необработанная ошибка. Требуется актуализировать список.'
					}, HttpStatus.BAD_REQUEST)
				}
			}

			console.log(err)

			throw new Error('Неизвестная ошибка сервера.')
		}
	}
}
