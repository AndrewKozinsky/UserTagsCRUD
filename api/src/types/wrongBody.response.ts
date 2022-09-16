import { ApiProperty } from '@nestjs/swagger'
import { ResponseObjType } from './responseTypes'

/**
 * Тип ответа сервера посылаемый в ответ на неправильные данные в теле запроса посланные пользователем
 */
export class WrongBodyResponse implements ResponseObjType.Fail{
	@ApiProperty({ example: 'fail' })
	status: 'fail'

	@ApiProperty({ example: 400 })
	statusCode: 400

	@ApiProperty({ example: 'Поля тела запроса содержат ошибки' })
	message: string

	@ApiProperty({ example: {
		nickname: [
			'Значение должно быть короче или равно 100 символам',
			'Должно быть строковое значение'
		]
	} })
	fieldsErrors: Record<string, string[]>
}
