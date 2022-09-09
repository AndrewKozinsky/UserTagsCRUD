import { HttpStatus } from '@nestjs/common'

// Типы данных отправляемых сервером
export namespace ResponseObjType {
	// Ошибка сервера
	export type Error = {
		status: 'error',
		statusCode: 500,
		message: string
	}

	// Ошибка пользователя
	export type Fail = {
		status: 'fail'
		statusCode: HttpStatus
		message?: string // Главное сообщение об ошибке. Например: «Доступ запрещён»
		fieldsErrors?: Errors // Объект с названиями свойства и массивом ошибок в его значении. Требуется если при проверки тела запроса обнаружились ошибки.
	}

	export type ErrorsGroup = {
		message?: string
		fieldsErrors?: Errors
	}

	export type Errors = Record<string, string[]>
}
