import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommoditiesController } from './commodities.controller'
import { Commodity } from './entities/commodity.entity'
import { CommoditiesService } from './services/commodities.service'
import { ClientsModule } from '@nestjs/microservices'
import { CropsService } from './services/crops.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Commodity]),
    ClientsModule.register([
      {
        name: process.env.PROPERTY_SERVICE_CLIENT || 'PROPERTY_SERVICE_CLIENT',
        options: {
          host: process.env.PROPERTY_HOST ?? 'localhost',
          port: Number(process.env.PROPERTY_PORT || 3006),
        },
      },
    ]),
    ClientsModule.register([
      {
        name: process.env.CROP_SERVICE_CLIENT || 'CROP_SERVICE_CLIENT',
        options: {
          host: process.env.CROPS_HOST ?? 'localhost',
          port: Number(process.env.CROPS_PORT || 3002),
        },
      },
    ]),
  ],
  controllers: [CommoditiesController],
  providers: [CommoditiesService, CropsService],
})
export class CommoditiesModule {}
