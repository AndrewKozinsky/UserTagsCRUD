import * as request from 'supertest'
import { HttpStatus, INestApplication } from '@nestjs/common'
import SignInDto from '../../src/modules/user/dto/signIn.dto'
import { SignInCreatedResponse } from '../../src/modules/user/responses/signIn.response'
import { WrongBodyResponse } from '../../src/types/wrongBody.response'
import { clearDatabase, initApp } from '../common'


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

describe('User', () => {
	describe('/signin (POST)', () => {
		it('Создание пользователя с правильными данными', (done) => {
			const signInDto: SignInDto = {
				email: 'test11@test.ru',
				password: 'passwordQ1',
				nickname: 'nickname11'
			}

			request(app.getHttpServer())
				.post('/signin')
				.send(signInDto)
				.expect(HttpStatus.CREATED)
				.then((response) => {
					const responseObj: SignInCreatedResponse = response.body

					expect(typeof responseObj.token).toBe('string')
					// expect(responseObj.expire).toBe('1800')

					done()
				})
		})
	})

	describe('/signin (POST)', () => {
		it('Создание пользователя с неверной почтой', (done) => {
			const signInDto: SignInDto = {
				email: 'wrong-email',
				password: 'passwordQ1',
				nickname: 'nickname11'
			}

			request(app.getHttpServer())
				.post('/signin')
				.send(signInDto)
				.expect(HttpStatus.BAD_REQUEST)
				.then((response) => {
					const responseObj: WrongBodyResponse = response.body
					expect(responseObj.status).toBe('fail')
					done()
				})
		})
	})

	describe('/signin (POST)', () => {
		it('Создание пользователя с неподходящем паролем', (done) => {
			const signInDto: SignInDto = {
				email: 'test11@test.ru',
				password: 'wrong-password',
				nickname: 'nickname11'
			}

			request(app.getHttpServer())
				.post('/signin')
				.send(signInDto)
				.expect(HttpStatus.BAD_REQUEST)
				.then((response) => {
					const responseObj: WrongBodyResponse = response.body
					expect(responseObj.status).toBe('fail')
					done()
				})
		})
	})

	describe('/signin (POST)', () => {
		it('Создание пользователей с одинаковой почтой', (done) => {
			const firstUserDto: SignInDto = {
				email: 'user1@test.ru',
				password: 'passwordQ1',
				nickname: 'user1'
			}

			const secondUserDto: SignInDto = {
				email: 'user1@test.ru',
				password: 'passwordQ1',
				nickname: 'user2'
			}

			request(app.getHttpServer())
				.post('/signin')
				.send(firstUserDto)
				.then(() => {

					request(app.getHttpServer())
						.post('/signin')
						.send(secondUserDto)
						.expect(HttpStatus.BAD_REQUEST)
						.then((response) => {
							const responseObj: WrongBodyResponse = response.body
							expect(responseObj.status).toBe('fail')
							done()
						})
				})
		})
	})

	describe('/signin (POST)', () => {
		it('Создание пользователей с одинаковыми псевдонимами', (done) => {
			const firstUserDto: SignInDto = {
				email: 'user1@test.ru',
				password: 'passwordQ1',
				nickname: 'user'
			}

			const secondUserDto: SignInDto = {
				email: 'user2@test.ru',
				password: 'passwordQ1',
				nickname: 'user'
			}

			request(app.getHttpServer())
				.post('/signin')
				.send(firstUserDto)
				.then(() => {

					request(app.getHttpServer())
						.post('/signin')
						.send(secondUserDto)
						.expect(HttpStatus.BAD_REQUEST)
						.then((response) => {
							const responseObj: WrongBodyResponse = response.body
							expect(responseObj.status).toBe('fail')
							done()
						})
				})
		})
	})
})
