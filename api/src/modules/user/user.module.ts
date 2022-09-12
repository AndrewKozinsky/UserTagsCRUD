import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { HelperService } from '../helper/helper.service'
import { PrismaClient } from 'prisma/client'
import { UserTagService } from '../user-tag/userTag.service'
import { TagService } from '../tag/tag.service'

@Module({
	imports: [],
	controllers: [UserController],
	providers: [UserService, HelperService, PrismaClient, UserTagService, TagService],
	exports: [UserService]
})
export class UserModule {

}
