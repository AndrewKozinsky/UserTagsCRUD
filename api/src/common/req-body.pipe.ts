import {
	ArgumentMetadata,
	HttpException,
	HttpStatus,
	Injectable,
	PipeTransform,
	ValidationError
} from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { ResponseObjType } from '../types/responseTypes'

/** Трубка проверяющая соответствие тела запроса данным описанным в DTO */
@Injectable()
export class ReqBodyPipe implements PipeTransform {
	async transform(value: unknown, { metatype }: ArgumentMetadata) {
		if (!metatype || !this.toValidate(metatype)) return value

		const object = plainToInstance(metatype, value)

		const errors = await validate(object)

		if (errors.length > 0) {
			const fieldsErrors = this.formatErrors(errors)
			const body = this.formatResponse(fieldsErrors)

			throw new HttpException(body, HttpStatus.BAD_REQUEST)
		}
		return value
	}

	private toValidate(metatype: Function): boolean {
		const types: Function[] = [String, Boolean, Number, Array, Object]
		return !types.includes(metatype)
	}

	formatErrors(errors: ValidationError[]): ResponseObjType.Errors {
		return errors.reduce((acc, err) => {
			// @ts-ignore
			acc[err.property] = Object.values(err.constraints)
			return acc
		}, {})
	}

	formatResponse(fieldsErrors: ResponseObjType.Errors): ResponseObjType.ErrorsGroup {
		return {
			message: 'Поля тела запроса содержат ошибки',
			fieldsErrors
		}
	}
}
