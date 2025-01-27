import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CropsController } from './crops.controller'
import { Crop } from './entities/crop.entity'
import { CropsService } from './services/crops.service'
import { CommoditiesService } from './services/commodities.service'
import { PropertiesService } from './services/properties.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Crop]),
    ClientsModule.register([
      {
        name: process.env.PROPERTY_SERVICE_CLIENT || 'PROPERTY_SERVICE_CLIENT',
        transport: Transport.TCP, // TCP communication
        options: {
          host: process.env.PRODUCER_HOST ?? 'localhost',
          port: Number(process.env.PRODUCER_PORT || 3006),
        }, // Microservice address
      },
    ]),
    ClientsModule.register([
      {
        name: process.env.COMMODITY_SERVICE_CLIENT || 'COMMODITY_SERVICE_CLIENT',
        transport: Transport.TCP, // TCP communication
        options: {
          host: process.env.LOCATION_HOST ?? 'localhost',
          port: Number(process.env.LOCATION_PORT || 3001),
        }, // Microservice address
      },
    ]),
  ],
  controllers: [CropsController],
  providers: [CropsService, CommoditiesService, PropertiesService],
})
export class CropsModule {}
