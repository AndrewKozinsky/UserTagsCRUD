import { Module } from '@nestjs/common'
import { TagController } from './tag.controller'
import { TagService } from './tag.service'
import { HelperService } from '../helper/helper.service'
import { PrismaClient } from 'prisma/client'

@Module({
	controllers: [TagController],
	providers: [TagService, HelperService, PrismaClient]
})
export class TagModule {}
