import { Module } from '@nestjs/common'
import { ClientsModule } from '@nestjs/microservices'
import { DashboardsController } from './dashboards.controller'
import { CropsService } from './services/crops.service'
import { DashboardsService } from './services/dashboards.service'
import { LocationsService } from './services/locations.service'
import { PropertiesService } from './services/properties.service'

@Module({
  imports: [
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
          host: process.env.CROP_HOST ?? 'localhost',
          port: Number(process.env.CROP_PORT || 3002),
        },
      },
    ]),
    ClientsModule.register([
      {
        name: process.env.LOCATION_SERVICE_CLIENT || 'LOCATION_SERVICE_CLIENT',
        options: {
          host: process.env.LOCATION_HOST ?? 'localhost',
          port: Number(process.env.LOCATION_PORT || 3004),
        },
      },
    ]),
  ],
  controllers: [DashboardsController],
  providers: [DashboardsService, PropertiesService, LocationsService, CropsService],
})
export class DashboardsModule {}
