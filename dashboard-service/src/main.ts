import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { ValidationPipe } from '@nestjs/common'
import { useContainer } from 'class-validator'
import { ResponseInterceptor } from './dashboards/interceptors/response.interceptor'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: { host: '0.0.0.0', port: Number(process.env.PORT || 3003) },
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: false,
    }),
  )

  app.useGlobalInterceptors(new ResponseInterceptor())
  // useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen()
}

void bootstrap()
