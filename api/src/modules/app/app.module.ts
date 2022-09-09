import { MiddlewareConsumer, Module } from '@nestjs/common'
import { UserModule } from '../user/user.module'
import { IncludeUserMiddleware } from '../../common/includeUser.middleware'


@Module({
	imports: [UserModule]
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(IncludeUserMiddleware)
			.forRoutes('')
	}
}
