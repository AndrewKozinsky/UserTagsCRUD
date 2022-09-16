// import { HttpExceptionFilter } from '../http-exeption.filter'
// import { HttpException } from '@nestjs/common'
// import { ResponseObjType } from '../../types/responseTypes'

// let httpExceptionFilter = new HttpExceptionFilter()
// const errorMessage = 'test error'

/*beforeAll(() => {
	httpExceptionFilter = new HttpExceptionFilter()
})*/

/*describe('HttpExceptionFilter', () => {
	describe('catch()', () => {
		it('Возвращает объект со статусом fail и переданным кодом если первый аргумент типа HttpException', () => {
			const [host, jsonMock] = getHostAndJson()
			const statusCode = 404
			const httpError = new HttpException(errorMessage, statusCode)

			try {
				httpExceptionFilter.catch(httpError, host)
			}
			catch (error) {

			}

			const firstArg = jsonMock.mock.calls[0][0]
			expect(firstArg.status).toBe('fail')
			expect(firstArg.statusCode).toBe(statusCode)
		})

		it('Возвращает объект со статусом error и кодом 500 если первый аргумент типа Error', () => {
			const [host, jsonMock] = getHostAndJson()
			const httpError = new Error(errorMessage)

			try {
				httpExceptionFilter.catch(httpError, host)
			}
			catch (error) {

			}

			const firstArg = jsonMock.mock.calls[0][0]
			expect(firstArg.status).toBe('error')
			expect(firstArg.statusCode).toBe(500)
		})
	})
})*/

/*
function getHostAndJson() {
	const jsonMock = jest.fn((responseData: ResponseObjType.Fail | ResponseObjType.Error) => {

	})

	const host = {
		switchToHttp() {
			return {
				getResponse() {
					return {
						json: jsonMock
					}
				}
			}
		}
	} as any

	return [host, jsonMock]
}
*/
