import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ApiGatewayController } from './api-gateway.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: process.env.PRODUCER_SERVICE_CLIENT || 'PRODUCER_SERVICE_CLIENT',
        transport: Transport.TCP, // TCP communication
        options: {
          host: process.env.PRODUCER_HOST ?? 'localhost',
          port: Number(process.env.PRODUCER_PORT || 3003),
        }, // Microservice address
      },
    ]),
  ],
  controllers: [ApiGatewayController],
  providers: [],
})
export class ApiGatewayModule {}
