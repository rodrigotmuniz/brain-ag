import { NestFactory } from '@nestjs/core'
import { DashboardModule } from './dashboard.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(DashboardModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove chaves que não estão no DTO
      forbidNonWhitelisted: true, // levantar erro quando a chave não existir
      transform: false, // tenta transformar os tipos de dados de param e dtos
    }),
  )
  await app.listen(process.env.PORT ?? 3000)
}
void bootstrap()
