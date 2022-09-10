import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'

export default class CreateTagDto {
	@IsString({ message: 'Должно быть строковое значение' })
	@MaxLength(40, { message: 'Значение должно быть короче или равно 40 символам' })
	name: string

	@IsNumber({}, { message: 'Должно быть числовое значение' })
	@IsOptional()
	sortOrder: number
}
	
