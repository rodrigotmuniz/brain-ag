import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CropsController } from './crops.controller'
import { Crop } from './entities/crop.entity'
import { CommoditiesService } from './services/commodities.service'
import { CropsService } from './services/crops.service'
import { PropertiesService } from './services/properties.service'
import { CommodityExistsValidator } from './validators/commodity-exists.validator'
import { PropertyExistsValidator } from './validators/property-exists.validator'

@Module({
  imports: [
    TypeOrmModule.forFeature([Crop]),
    ClientsModule.register([
      {
        name: process.env.PROPERTY_SERVICE_CLIENT || 'PROPERTY_SERVICE_CLIENT',
        transport: Transport.TCP, // TCP communication
        options: {
          host: process.env.PROPERTY_HOST ?? 'localhost',
          port: Number(process.env.PROPERTY_PORT || 3006),
        },
      },
    ]),
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
  controllers: [CropsController],
  providers: [CropsService, CommoditiesService, PropertiesService, CommodityExistsValidator, PropertyExistsValidator],
})
export class CropsModule {}
