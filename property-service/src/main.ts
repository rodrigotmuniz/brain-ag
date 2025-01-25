import { NestFactory } from '@nestjs/core';
import { PropertiesModule } from './properties.module';

async function bootstrap() {
  const app = await NestFactory.create(PropertiesModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
