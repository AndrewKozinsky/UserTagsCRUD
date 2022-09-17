import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AppModule } from '../src/modules/app/app.module'
import * as cookieParser from 'cookie-parser'
import { ReqBodyPipe } from '../src/common/req-body.pipe'
import { HttpExceptionFilter } from '../src/common/http-exeption.filter'
import { CorsInterceptor } from '../src/common/cors.interceptor'
import axios, { AxiosRequestConfig } from 'axios'
import { SignInCreatedResponse } from '../src/modules/user/responses/signIn.response'
import SignInDto from '../src/modules/user/dto/signIn.dto'

/**
 * Инициализация приложения для концевых тестов
 * @param {Object} app — объект приложения
 */
export async function initApp(app: INestApplication) {
	const moduleRef = await Test.createTestingModule({
		imports: [AppModule],
	}).compile()

	app = moduleRef.createNestApplication()

	app.use(cookieParser())
	app.useGlobalPipes(new ReqBodyPipe())
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
	app.useGlobalFilters(new HttpExceptionFilter())
	app.useGlobalInterceptors(new CorsInterceptor())

	await app.init()

	return app
}

/** Функция очищает базу данных */
export async function clearDatabase() {
	// Получение токена пользователя от имени которого будут делаться все запросы
	const response = await createLegateUser()
	const token = response.data.token

	const config: AxiosRequestConfig = {
		headers: { authorization: 'Bearer ' + token }
	}

	// Удаление всех пользователей, тегов, и тегов пользователей
	await axios.delete('http://api:3000/tag', config)
	await axios.delete('http://api:3000/userTag', config)
	await axios.delete('http://api:3000/users', config)
}

/** Функция создаёт пользователя от имени которого будут делаться все запросы */
async function createLegateUser(): Promise<{data: SignInCreatedResponse}> | never {
	let digits = Math.random().toString()
	digits = digits.substring(2, 7)

	const body: SignInDto = {
		email: 'e' + digits + '@email.com',
		password: 'passwordQ1_',
		nickname: 'admin' + digits
	}

	const config: AxiosRequestConfig = {
		headers: { 'Content-Type': 'application/json' },
	}

	try {
		return await axios.post('http://api:3000/signin', body, config)
	}
	catch (error) {
		throw new Error('Fail do request to http://api:3000/signin')
	}
}
