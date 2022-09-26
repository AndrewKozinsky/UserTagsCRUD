import * as request from 'supertest'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { FailFullResponse, FailResponse } from '../../src/types/wrongBody.response'
import { clearDatabase, createTestUser, initApp, testUserCredentials } from '../common'
import LogInDto from '../../src/modules/user/dto/logIn.dto'
import { LogInOkResponse } from '../../src/modules/user/responses/logIn.response'
import { getCookie } from '../../src/utils/miscUtils'


let app: INestApplication

beforeAll(async () => {
	app = await initApp(app)

	await clearDatabase()
})

afterEach(async () => {
	await clearDatabase()
})

afterAll(async () => {
	await app.close()
})


describe('/login (POST)', () => {
	it('Вход существующего пользователя с правильными данными', async () => {
		await createTestUser()

		const logInDto: LogInDto = {
			email: testUserCredentials.email,
			password: testUserCredentials.password
		}

		const response = await request(app.getHttpServer())
			.post('/login')
			.set('Accept', 'application/json')
			.send(logInDto)

		const body: LogInOkResponse = response.body

		const cookies = response.headers['set-cookie']
		const token = getCookie(cookies[0], 'token')

		expect(response.status).toBe(HttpStatus.OK)
		expect(typeof body.token).toBe('string')
		// expect(body.expire).toBe('1800')
		expect(typeof token).toBe('string')
	})

	it('Вход пользователя с неправильными данными', async () => {
		await createTestUser()

		const logInDto: LogInDto = {
			email: 'wrong@email.com',
			password: testUserCredentials.password
		}

		const response = await request(app.getHttpServer())
			.post('/login')
			.set('Accept', 'application/json')
			.send(logInDto)

		const body: FailResponse = response.body

		expect(response.status).toBe(HttpStatus.BAD_REQUEST)
		expect(body.status).toBe('fail')
		expect(body.message).toBe('Пользователь не найден. Неправильная почта или пароль.')
	})

	it('Вход пользователя с недопустимой почтой и паролем', async () => {
		await createTestUser()

		const logInDto: LogInDto = {
			email: 'wrongEmail',
			password: '123'
		}

		const response = await request(app.getHttpServer())
			.post('/login')
			.set('Accept', 'application/json')
			.send(logInDto)

		const body: FailFullResponse = response.body

		expect(response.status).toBe(HttpStatus.BAD_REQUEST)
		expect(body.status).toBe('fail')
		expect(typeof body.fieldsErrors.email[0]).toBe('string')
		expect(typeof body.fieldsErrors.password[0]).toBe('string')
	})
})
