import { IncludeUserMiddleware } from '../include-user.middleware'


describe('IncludeUserMiddleware', () => {
	describe('use()', () => {
		it('Если токен не передан, то не запускается функция нахождения пользователя', () => {
			const userService = getUserService()
			const includeUserMiddleware = new IncludeUserMiddleware(getUserService())
			const request = {}

			includeUserMiddleware.use(request, {}, () => {})

			expect(userService.extractUserUidFromToken).not.toBeCalled()
		})


	})
})

function getUserService(): any {
	return {
		getTokenFromRequest: jest.fn((request: { token: boolean }) => {
			return request.token ? 'token' : false
		}),
		extractUserUidFromToken: jest.fn((token: string) => {
			return 'userId'
		}),
		getUserByCredentials: jest.fn(({ uid: string }) => {
			return { uid: 'userId' }
		})
	}
}
