// import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator'
// import { ApiProperty } from '@nestjs/swagger'

/*export default class LogInDto {
	@IsString({ message: 'Должно быть строковое значение' })
	@MaxLength(100, { message: 'Значение должно быть короче или равно 100 символам' })
	@IsEmail({}, { message: 'Значение должно быть адресом электронной почты' })
	@ApiProperty({ description: 'Почта пользователя', maxLength: 100 })
	email: string

	@IsString({ message: 'Должно быть строковое значение' })
	@MinLength(8, { message: 'Значение должно быть длиннее или равно 8 символам' })
	@MaxLength(100, { message: 'Значение должно быть короче или равно 100 символам' })
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Пароль должен содержать как минимум одну цифру, одну заглавную и одну строчную буквы.' })
	@ApiProperty({ description: 'Пароль пользователя', minLength:8 , maxLength: 100 })
	password: string
}*/
