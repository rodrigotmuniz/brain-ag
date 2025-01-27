import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LocationsService } from './services/locations.service'
import { ProducersService } from './services/producers.service'
import { LocationExistsValidator } from './validators/location-exists.validator'
import { ProducerExistsValidator } from './validators/producer-exists.validator'
import { TotalAreaSizeValidator } from './validators/total-area-size.validator'
import { DashboardsController } from './dashboards.controller'
import { Dashboard } from './entities/dashboard.entity'
import { DashboardsService } from './services/dashboards.service'
import { PropertiesService } from './services/properties.service'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: process.env.PROPERTY_SERVICE_CLIENT || 'PROPERTY_SERVICE_CLIENT',
        transport: Transport.TCP, // TCP communication
        options: {
          host: process.env.PROPERTY_HOST ?? 'localhost',
          port: Number(process.env.PROPERTY_PORT || 3006),
        }, // Microservice address
      },
    ]),
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
    ClientsModule.register([
      {
        name: process.env.LOCATION_SERVICE_CLIENT || 'LOCATION_SERVICE_CLIENT',
        transport: Transport.TCP, // TCP communication
        options: {
          host: process.env.LOCATION_HOST ?? 'localhost',
          port: Number(process.env.LOCATION_PORT || 3004),
        }, // Microservice address
      },
    ]),
  ],
  controllers: [DashboardsController],
  providers: [
    DashboardsService,
    PropertiesService
  ],
})
export class DashboardsModule {}
