import { Module } from '@nestjs/common'
import { UserTagService } from './userTag.service'

@Module({
	providers: [UserTagService],
	exports: [UserTagService]
})
export class UserTagModule {}
