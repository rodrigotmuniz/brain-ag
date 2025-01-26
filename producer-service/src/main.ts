import { NestFactory } from '@nestjs/core';
import { ProducersModule } from './producers.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProducersModule,
    {
      transport: Transport.TCP,
      options: { host: '0.0.0.0', port: Number(process.env.PORT || 3003) },
    },
  );
  await app.listen();
}

void bootstrap();
