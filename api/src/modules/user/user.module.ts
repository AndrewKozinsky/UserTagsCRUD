import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { HelperService } from '../helper/helper.service'
import { UserTagService } from '../user-tag/userTag.service'
// import { TagService } from '../tag/tag.service'

@Module({
	imports: [],
	controllers: [UserController],
	providers: [UserService, HelperService, UserTagService/*, TagService*/],
	exports: [UserService]
})
export class UserModule {}
