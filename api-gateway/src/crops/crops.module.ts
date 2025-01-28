import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { CropsController } from './crops.controller'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: process.env.CROP_SERVICE_CLIENT || 'CROP_SERVICE_CLIENT',
        transport: Transport.TCP, // TCP communication
        options: {
          host: process.env.CROPS_HOST ?? 'localhost',
          port: Number(process.env.CROPS_PORT || 3002),
        }, // Microservice address
      },
    ]),
  ],
  controllers: [CropsController],
})
export class CropsModule {}
