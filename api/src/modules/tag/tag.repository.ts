import { Repository } from '../../common/repository'
import { Inject, Injectable } from '@nestjs/common'
import { Prisma, PrismaClient } from '../../../prisma/client'

@Injectable()
export default class TagRepository extends Repository {
	constructor(
		@Inject('prismaClient') private prismaClient: PrismaClient
	) {
		super()
	}

	async deleteAll() {
		return await this.run<Prisma.BatchPayload>(() => {
			return this.prismaClient.tag.deleteMany()
		})
	}
}
