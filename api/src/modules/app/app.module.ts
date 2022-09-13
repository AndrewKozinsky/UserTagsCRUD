import { MiddlewareConsumer, Module } from '@nestjs/common'
import { UserModule } from '../user/user.module'
import { IncludeUserMiddleware } from '../../common/include-user.middleware'
import { TagModule } from '../tag/tag.module'


@Module({
	imports: [UserModule, TagModule],
	controllers: []
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(IncludeUserMiddleware)
			.forRoutes('')
	}
}
