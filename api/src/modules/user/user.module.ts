import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import UserService from './user.service'
// import { TagModule } from '../tag/tag.module'
import UserRepository from './user.repository'
import { UserTagModule } from '../user-tag/userTag.module'

@Module({
	imports: [/*TagModule,*/ UserTagModule],
	controllers: [UserController],
	providers: [UserService, UserRepository],
	exports: [UserService, UserRepository]
})
export class UserModule {}
