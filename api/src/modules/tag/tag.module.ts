import { Module } from '@nestjs/common'
import { TagController } from './tag.controller'
import { TagService } from './tag.service'
import { HelperService } from '../helper/helper.service'

@Module({
	controllers: [TagController],
	providers: [TagService, HelperService]
})
export class TagModule {}
