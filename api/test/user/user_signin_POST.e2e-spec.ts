// import * as request from 'supertest'
import axios, { AxiosRequestConfig } from 'axios'
import { Test } from '@nestjs/testing'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { AppModule } from '../../src/modules/app/app.module'
import SignInDto from '../../src/modules/user/dto/signIn.dto'
import { SignInCreatedResponse } from '../../src/modules/user/responses/signIn.response'


let app: INestApplication

beforeAll(async () => {
	const moduleRef = await Test.createTestingModule({
		imports: [AppModule],
	}).compile()

	app = moduleRef.createNestApplication()
	await app.init()
})

afterEach(async () => {
	await clearDatabase()
})

/*afterAll(async () => {
	await app.close()
})*/

/*describe('User', () => {
	describe('/signin (POST)', () => {
		it('Создание пользователя', (done) => {
			const signInDto: SignInDto = {
				email: 'test11@test.ru',
				password: 'passwordQ1',
				nickname: 'nickname11'
			}

			type ResponseBodyType = {
				token: string,
				expire: 1800
			}

			request(app.getHttpServer())
				.post('/signin')
				.send(signInDto)
				.expect(HttpStatus.CREATED)
				.then((response) => {
					const responseObj: ResponseBodyType = response.body

					expect(typeof responseObj.token).toBe('string')
					expect(responseObj.expire).toBe('1800')

					done()
				})
		})
	})
})*/

/** Функция очищает базу данных */
async function clearDatabase() {
	// Получение токена пользователя от имени которого будут делаться все запросы
	const response = await createUser()
	const token = response.data.token

	const config: AxiosRequestConfig = {
		headers: { authorization: 'Bearer ' + token }
	}

	// Удаление всех пользователей, тегов, и тегов пользователей
	await axios.delete('http://api:3000/users', config)
	await axios.delete('http://api:3000/tag', config)
	await axios.delete('http://api:3000/userTag', config)
}

/** Функция создаёт пользователя от имени которого будут делаться все запросы */
async function createUser(): Promise<{data: SignInCreatedResponse}> {
	const body: SignInDto = {
		email: 'admin@admin.ru',
		password: 'passwordQ1_',
		nickname: 'admin'
	}

	const config: AxiosRequestConfig = {
		headers: { 'Content-Type': 'application/json' },
	}

	return await axios.post('http://api:3000/signin', body, config)
}
