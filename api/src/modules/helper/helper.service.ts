import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '../../../prisma/client/runtime'
import { PrismaClientKnownRequestError as PrismaClientKnownRequestErrorTest } from '../../../prisma_test/client/runtime'
import { ResponseObjType } from '../../types/responseTypes'

/** Класс с различными методами используемые на всём приложении */
@Injectable()
export class HelperService {

	/**
	 * Метод запускает функцию с методом Призмы. Например, для записи сущности в таблицу БД.
	 * При появлении ошибки будет выброшено исключение, которое будет обработано в фильтре.
	 * @param {Function} queryFn — запускаемый метод Призмы
	 */
	async runQuery<T>(queryFn: () => Promise<T>): Promise<T | never> {
		try {
			return await queryFn()
		}
		catch(err) {

			// Типы ошибок Призмы описаны в prisma.io/docs/reference/api-reference/error-reference
			if (err instanceof PrismaClientKnownRequestError || err instanceof PrismaClientKnownRequestErrorTest) {
				if (err.code == 'P2002' && err.meta) {
					const errorBody: ResponseObjType.ErrorsGroup = {
						message: 'Поля тела запроса содержат ошибки',
						fieldsErrors: {
							[err.meta.target as string]: ['Значение поля должно быть уникальным.']
						}
					}
					throw new HttpException(errorBody, HttpStatus.BAD_REQUEST)
				}
				else if (err.code == 'P2025' && err.meta) {
					const errorBody: ResponseObjType.ErrorsGroup = {
						message: 'Сущность не найдена.'
					}
					throw new HttpException(errorBody, HttpStatus.BAD_REQUEST)
				}
				else {
					console.error(err)

					const errorBody: ResponseObjType.ErrorsGroup = {
						message: 'Необработанная ошибка. Требуется актуализировать список.'
					}

					throw new HttpException(errorBody, HttpStatus.BAD_REQUEST)
				}
			}

			console.error(err)

			throw new Error('Неизвестная ошибка сервера.')
		}
	}
}
