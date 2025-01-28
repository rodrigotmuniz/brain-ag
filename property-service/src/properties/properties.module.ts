import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Property } from './entities/property.entity'
import { PropertiesController } from './properties.controller'
import { CropsService } from './services/crops.service'
import { LocationsService } from './services/locations.service'
import { ProducersService } from './services/producers.service'
import { PropertiesService } from './services/properties.service'
import { LocationExistsValidator } from './validators/location-exists.validator'
import { ProducerExistsValidator } from './validators/producer-exists.validator'
import { TotalAreaSizeValidator } from './validators/total-area-size.validator'

@Module({
  imports: [
    TypeOrmModule.forFeature([Property]),
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
    ClientsModule.register([
      {
        name: process.env.LOCATION_SERVICE_CLIENT || 'LOCATION_SERVICE_CLIENT',
        transport: Transport.TCP,
        options: {
          host: process.env.LOCATION_HOST ?? 'localhost',
          port: Number(process.env.LOCATION_PORT || 3004),
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
  controllers: [PropertiesController],
  providers: [
    PropertiesService,
    ProducersService,
    LocationsService,
    CropsService,
    LocationExistsValidator,
    ProducerExistsValidator,
    TotalAreaSizeValidator,
  ],
})
export class PropertiesModule {}
