import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator'

export default class UpdateUserDto {
	@IsString({ message: 'Должно быть строковое значение' })
	@IsOptional()
	@MaxLength(100, { message: 'Значение должно быть короче или равно 100 символам' })
	@IsEmail({}, { message: 'Значение должно быть адресом электронной почты' })
	email?: string

	@IsString({ message: 'Должно быть строковое значение' })
	@IsOptional()
	@MinLength(8, { message: 'Значение должно быть длиннее или равно 8 символам' })
	@MaxLength(100, { message: 'Значение должно быть короче или равно 100 символам' })
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Пароль должен содержать как минимум одну цифру, одну заглавную и одну строчную буквы.' })
	password?: string

	@IsString({ message: 'Должно быть строковое значение' })
	@IsOptional()
	@MaxLength(100, { message: 'Значение должно быть короче или равно 100 символам' })
	nickname?: string
}
