import { Request } from 'express'
import { User } from 'prisma/client'

export type JwtTokenPayloadType = { uid: string }

// Расширение стандартного объекта Request из Экспресса
export type AppRequest = Request & {
	user?: User
}

