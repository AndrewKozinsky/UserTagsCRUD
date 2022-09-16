import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export default class SignInDto {
	@IsString({ message: 'Должно быть строковое значение' })
	@MaxLength(100, { message: 'Значение должно быть короче или равно 100 символам' })
	@IsEmail({}, { message: 'Значение должно быть адресом электронной почты' })
	@ApiProperty({
		description: 'Почта пользователя',
		maxLength: 100,
		example: 'me@email.ru'
	})
	email: string

	@IsString({ message: 'Должно быть строковое значение' })
	@MinLength(8, { message: 'Значение должно быть длиннее или равно 8 символам' })
	@MaxLength(100, { message: 'Значение должно быть короче или равно 100 символам' })
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Пароль должен содержать как минимум одну цифру, одну заглавную и одну строчную буквы.' })
	@ApiProperty({
		description: 'Пароль пользователя. Должен содержать от 8 символов с как минимумом одной заглавной буквой и одной цифрой',
		minLength:8,
		maxLength: 100,
		example: 'A2ndqwerth'
	})
	password: string

	@IsString({ message: 'Должно быть строковое значение' })
	@MaxLength(100, { message: 'Значение должно быть короче или равно 100 символам' })
	@ApiProperty({
		description: 'Псевдоним пользователя. Должен быть уникальным.',
		maxLength: 100,
		example: 'Andrew Kozinsky'
	})
	nickname: string
}
