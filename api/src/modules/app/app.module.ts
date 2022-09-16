import { MiddlewareConsumer, Module } from '@nestjs/common'
import { UserModule } from '../user/user.module'
import { IncludeUserMiddleware } from '../../common/include-user.middleware'
// import { TagModule } from '../tag/tag.module'
import { PrismaModule } from '../prisma/prisma.module'
// import { UserTagModule } from '../user-tag/userTag.module'


@Module({
	imports: [
		PrismaModule.forRoot(),
		UserModule,
		// TagModule,
		// UserTagModule
	],
	controllers: []
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		// Поиск в запросе токена, проверка и помещение в объект запроса данных пользователя
		consumer
			.apply(IncludeUserMiddleware)
			.forRoutes('')
	}
}
