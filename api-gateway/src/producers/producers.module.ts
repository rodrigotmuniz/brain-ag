import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ProducersController } from './producers.controller'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: process.env.PRODUCER_SERVICE_CLIENT || 'PRODUCER_SERVICE_CLIENT',
        transport: Transport.TCP,
        options: {
          host: process.env.PRODUCER_HOST ?? 'localhost',
          port: Number(process.env.PRODUCER_PORT || 3005),
        },
      },
    ]),
  ],
  controllers: [ProducersController],
})
export class ProducersModule {}
