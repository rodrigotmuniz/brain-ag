import { Module } from '@nestjs/common'
import { ClientsModule } from '@nestjs/microservices'
import { CommoditiesController } from './commodities.controller'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: process.env.COMMODITY_SERVICE_CLIENT || 'COMMODITY_SERVICE_CLIENT',
        options: {
          host: process.env.COMMODITY_HOST ?? 'localhost',
          port: Number(process.env.COMMODITY_PORT || 3001),
        },
      },
    ]),
  ],
  controllers: [CommoditiesController],
})
export class CommoditiesModule {}
