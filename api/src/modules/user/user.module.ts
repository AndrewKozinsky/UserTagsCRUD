import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { HelperService } from '../helper/helper.service'
import { PrismaClient } from 'prisma/client'

@Module({
	imports: [],
	controllers: [UserController],
	providers: [UserService, HelperService, PrismaClient],
	exports: [UserService]
})
export class UserModule {

}
