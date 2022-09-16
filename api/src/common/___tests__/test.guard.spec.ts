// import { AuthGuard } from '../auth.guard'
// import { AppRequest } from '../../types/miscTypes'

// let authGuard = new AuthGuard()

/*beforeAll(() => {
	authGuard = new AuthGuard()
})*/

/*describe('AuthGuard()', () => {
	describe('canActivate()', () => {
		it('Возвращает правду если в объекте запроса есть объект user', async () => {
			const request = { user: {} } as AppRequest
			const context = getContext(request)

			const canActivateReturn = await authGuard.canActivate(context)

			expect(canActivateReturn).toBe(true)
		})

		it('Выбросит ошибку если в объекте запроса нет объекта user', async () => {
			const request = {} as AppRequest
			const context = getContext(request)

			try {
				await authGuard.canActivate(context)
			}
			catch (error: unknown) {
				expect(error).toBeDefined()
			}
		})
	})

	describe('throwDoNotAllowException()', () => {
		it('Выбрасывает ошибку', async () => {
			const throwExceptionWrapper = () => authGuard.throwDoNotAllowException()

			expect(throwExceptionWrapper).toThrow()
		})

		it('Выбрасывает ошибку с указанным текстом', async () => {
			const errorMessage = 'У вас нет права доступа к этому маршруту'
			const throwExceptionWrapper = () => authGuard.throwDoNotAllowException()

			expect(throwExceptionWrapper).toThrow(errorMessage)
		})
	})
})*/

/*function getContext(requestObj: Object): any {
	return {
		switchToHttp() {
			return {
				getRequest() {
					return requestObj
				}
			}
		}
	} as any
}*/
