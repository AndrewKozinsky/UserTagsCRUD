import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common'
import { PrismaClient } from '../../../prisma/client'
import { PrismaClient as PrismaClientTest } from '../../../prisma_test/client'

/** Клиент Призмы записывающий в базу данных для разработки */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	async onModuleInit() {
		await this.$connect()
	}

	async enableShutdownHooks(app: INestApplication) {
		this.$on('beforeExit', async () => {
			await app.close()
		})
	}
}

/** Клиент Призмы записывающий в базу данных для тестирования */
@Injectable()
export class PrismaServiceTest extends PrismaClientTest implements OnModuleInit {
	async onModuleInit() {
		await this.$connect()
	}

	async enableShutdownHooks(app: INestApplication) {
		this.$on('beforeExit', async () => {
			await app.close()
		})
	}
}
