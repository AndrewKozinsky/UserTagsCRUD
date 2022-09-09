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

/**
 * Трубка проверяющая соответствие тела запроса данным описанным в DTO
 */
@Injectable()
export class ReqBodyPipe implements PipeTransform {
	async transform(value: unknown, { metatype }: ArgumentMetadata) {

		if (!metatype || !this.toValidate(metatype)) return value

		const object = plainToInstance(metatype, value)
		const errors = await validate(object)

		if (errors.length > 0) {
			throw new HttpException({
				message: 'Поля тела запроса содержат ошибки',
				fieldsErrors: this.formatErrors(errors)
			}, HttpStatus.BAD_REQUEST)
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
}
