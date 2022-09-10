import { Request } from 'express'
import { User } from 'prisma/client'

export type JwtTokenPayloadType = { uid: string }

export type AppRequest = Request & {
	user?: User
}

