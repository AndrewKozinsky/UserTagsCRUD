import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './modules/app/app.module'
import { ReqBodyPipe } from './common/req-body.pipe'
import { HttpExceptionFilter } from './common/http-exeption.filter'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { CorsInterceptor } from './common/cors.interceptor'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.use(cookieParser())

	// Проверка соответствие тела запроса DTO
	app.useGlobalPipes(new ReqBodyPipe())

	// Удаление свойств отсутствующих в DTO передаваемых в теле объекта (важен порядок трубок!)
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

	// Обработчик всех исключений
	app.useGlobalFilters(new HttpExceptionFilter())

	// Перехватчик разрешающий запросы с любых хостов
	app.useGlobalInterceptors(new CorsInterceptor())

	setupSwagger(app)

	await app.listen(process.env.PORT)
}
bootstrap()

/**
 * Функция настраивает Swagger для приложения
 * @param {Object} app — объект приложения
 */
function setupSwagger(app: INestApplication) {
	const config = new DocumentBuilder()
		.setTitle('UserTags CRUD')
		.setDescription('Пример API с методами управления пользователей и их тегов')
		.setVersion('1.0')
		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('docs', app, document)
}
