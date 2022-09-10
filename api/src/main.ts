import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './modules/app/app.module'
import { ReqBodyPipe } from './common/req-body.pipe'
import { HttpExceptionFilter } from './common/http-exeption.filter'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.use(cookieParser())

	// Проверка соответствие тела запроса DTO
	app.useGlobalPipes(new ReqBodyPipe())

	// Удаление свойств отсутствующих в DTO передаваемых в теле объекта (важен порядок трубок!)
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

	// Обработчик всех исключений
	app.useGlobalFilters(new HttpExceptionFilter())

	await app.listen(process.env.PORT)
}
bootstrap()
