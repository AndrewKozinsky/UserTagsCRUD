// eslint-disable-next-line @typescript-eslint/no-var-requires
const crypto = require('node:crypto')
/**
 * Функция шифрует строку
 * @param {String} str — строка, которую нужно зашифровать
 */
export function getHash(str: string) {
	const secret = 'abcde'
	return crypto.createHmac('sha256', secret)
		.update(str)
		.digest('hex')
}

/**
 * Возвращает значение куки с указанным именем, или undefined, если ничего не найдено
 * @param {String} cookie — строка с куками
 * @param {String} name — название куки
 */
export function getCookie(cookie: string, name: string) {
	const matches = cookie.match(new RegExp(
		'(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'
	))
	return matches ? decodeURIComponent(matches[1]) : undefined
}



/*type CookieObjType<T extends string> = { T: string, Path: string, Expires: number }

export function getCookieObj<T extends string>(cookiesArr: string[], cookieName: T): null | CookieObjType<T> {

	for(let i = 0; i < cookiesArr.length; i++) {
		const currentCookie = cookiesArr[i]

		const parts = currentCookie.split('; ')

		const cookieObj: CookieObjType<T> = { T: '', Path: '', Expires: 0 }

		for (const part of parts) {
			const value = part.split('=')[1]

			if (part.startsWith(cookieName)) {
				cookieObj[cookieName] = value
			}
			else if (part.startsWith('Path')) {
				cookieObj.Path = value
			}
			else if (part.startsWith('Expires')) {
				cookieObj.Expires = +(new Date(value))
			}
		}

		if (cookieObj[cookieName]) {
			return cookieObj
		}
	}

	return null
}*/


type FirstPartType<T extends string> = {
	[key in T]: string
}

export function getCookieObj<T extends string>(cookieName: T) {
	const cookieObj: FirstPartType<T> = { [cookieName]: '' }
}
