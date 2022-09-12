import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'

export default class UpdateTagDto {
	@IsString({ message: 'Должно быть строковое значение' })
	@MaxLength(40, { message: 'Значение должно быть короче или равно 40 символам' })
	@IsOptional()
	name: string

	@IsNumber({}, { message: 'Должно быть числовое значение' })
	@IsOptional()
	sortOrder: number
}

