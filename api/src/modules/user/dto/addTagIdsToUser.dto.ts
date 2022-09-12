import { IsNumber } from 'class-validator'

export default class AddTagIdsToUserDto {
	@IsNumber({}, { each: true, message: 'Должен быть массив чисел' })
	tags: number[]
}
