import { Module } from '@nestjs/common';
import { ProducersController } from './producers.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: process.env.PRODUCER_SERVICE_CLIENT || 'PRODUCER_SERVICE_CLIENT',
        transport: Transport.TCP, // TCP communication
        options: {
          host: process.env.PRODUCER_HOST ?? 'localhost',
          port: Number(process.env.PRODUCER_PORT || 3005),
        }, // Microservice address
      },
    ]),
  ],
  controllers: [ProducersController],
})
export class ProducersModule {
  constructor() {
    console.log('PRODUCER_SERVICE_CLIENT', process.env.PRODUCER_SERVICE_CLIENT);
  }
}
