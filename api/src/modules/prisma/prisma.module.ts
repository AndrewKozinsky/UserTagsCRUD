import { DynamicModule, Global, Module } from '@nestjs/common'
import { PrismaService, PrismaServiceTest } from './prisma.service'

/** Модуль работы с ORM Prisma */
@Global()
@Module({})
export class PrismaModule {
	static forRoot(): DynamicModule {
		const PrismaClient =process.env.NODE_ENV == 'test' ?
			PrismaServiceTest: PrismaService

		const prismaProvider = {
			provide: 'prismaClient',
			useClass: PrismaClient,
		}

		return {
			module: PrismaModule,
			providers: [prismaProvider],
			exports: [prismaProvider]
		}
	}
}
