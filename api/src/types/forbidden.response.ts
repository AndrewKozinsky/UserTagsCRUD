import { ApiProperty } from '@nestjs/swagger'
import { ResponseObjType } from './responseTypes'
import { HttpStatus } from '@nestjs/common'

/**
 * Тип ответа сервера посылаемый в ответ если пользователю запрещено запрашивать этот маршрут
 */
export class ForbiddenResponse implements ResponseObjType.Fail{
	@ApiProperty({ example: 'У вас нет права доступа к этому маршруту' })
	status: 'fail'

	@ApiProperty({ example: HttpStatus.FORBIDDEN })
	statusCode: HttpStatus.FORBIDDEN

	@ApiProperty({ example: 'Поля тела запроса содержат ошибки' })
	message: string
}
