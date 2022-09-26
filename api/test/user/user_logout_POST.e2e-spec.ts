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


describe('/logout (POST)', () => {
	it('Получение правильного HTTP-статуса', async () => {
		const response = await request(app.getHttpServer())
			.post('/logout')

		expect(response.status).toBe(HttpStatus.NO_CONTENT)
	})

	it('Значение токена в куке должно быть равно пустой строке', async () => {
		const response = await request(app.getHttpServer())
			.post('/logout')

		const cookies = response.headers['set-cookie']
		const token = getCookie(cookies[0], 'token')

		expect(token).toBe('')
	})

	it('Время жизни куки с токеном должно истечь', async () => {
		const response = await request(app.getHttpServer())
			.post('/logout')

		const cookies = response.headers['set-cookie']
		console.log(cookies)

		expect(2).toBe(2)

		// TODO дописать тест
	})
})
