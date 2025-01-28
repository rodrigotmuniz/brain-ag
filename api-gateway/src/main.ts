import { NestFactory } from '@nestjs/core'
import { ApiGatewayModule } from './api-gateway.module'
import { ResponseInterceptor } from './commons/interceptors/response.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule)
  // app.useGlobalPipes(
  // new ValidationPipe({
  //   whitelist: true,
  //   forbidNonWhitelisted: true,
  //   transform: false,
  // }),
  // )
  app.useGlobalInterceptors(new ResponseInterceptor())

  await app.listen(process.env.PORT ?? 3000)
}
void bootstrap()
