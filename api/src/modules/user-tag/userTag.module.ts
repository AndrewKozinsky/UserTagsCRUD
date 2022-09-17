import { Module } from '@nestjs/common'
import { UserTagController } from './userTag.controller'
import { UserTagService } from './userTag.service'
import UserTagRepository from './userTag.repository'

@Module({
	controllers: [UserTagController],
	providers: [UserTagService, UserTagRepository],
	exports: [/*UserTagService, */UserTagRepository]
})
export class UserTagModule {}
