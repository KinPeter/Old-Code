import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConsoleLogger } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('PKStart Local API')
    .setDescription('The PKStart local API documentation')
    .setVersion('1.0')
    .addServer('http://localhost:8400')
    .build()
  const document = SwaggerModule.createDocument(app as any, config)
  SwaggerModule.setup('api', app as any, document)

  const port = process.env.PORT || 8400

  const logger = new ConsoleLogger()
  logger.setContext('NestApplication')

  await app.listen(port, () => {
    logger.log(`Listening on port ${port}`)
  })
}
bootstrap()
