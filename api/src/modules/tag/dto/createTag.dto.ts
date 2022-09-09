import { IsEmail, Matches, MaxLength, MinLength } from 'class-validator'

export default class CreateTagDto {
	// @MaxLength(100, { message: 'Значение должно быть короче или равно 100 символам' })
	name: string

	// @MinLength(8, { message: 'Значение должно быть длиннее или равно 8 символам' })
	// @MaxLength(100, { message: 'Значение должно быть короче или равно 100 символам' })
	sortOrder: string
}
