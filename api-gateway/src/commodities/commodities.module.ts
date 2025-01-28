import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { CommoditiesController } from './commodities.controller'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: process.env.COMMODITY_SERVICE_CLIENT || 'COMMODITY_SERVICE_CLIENT',
        transport: Transport.TCP, // TCP communication
        options: {
          host: process.env.COMMODITY_HOST ?? 'localhost',
          port: Number(process.env.COMMODITY_PORT || 3001),
        },
      },
    ]),
  ],
  controllers: [CommoditiesController],
})
export class CommoditiesModule {
  constructor() {
    console.log('COMMODITY_SERVICE_CLIENT', process.env.COMMODITY_SERVICE_CLIENT)
  }
}
