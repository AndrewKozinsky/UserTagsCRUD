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
