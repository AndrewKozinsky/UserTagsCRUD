import { Module } from '@nestjs/common'
import { UserTagService } from './userTag.service'
// import { UserTagController } from './user.controller'
// import { HelperService } from '../helper/helper.service'

@Module({
	controllers: [/*UserTagController*/],
	providers: [UserTagService/*, HelperService*/],
	exports: [UserTagService]
})
export class UserTagModule {}
