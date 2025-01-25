import { NestFactory } from '@nestjs/core';
import { CropsModule } from './crops.module';

async function bootstrap() {
  const app = await NestFactory.create(CropsModule);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
