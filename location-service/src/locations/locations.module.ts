import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Location } from './entities/location.entity'
import { LocationsController } from './locations.controller'
import { LocationsService } from './services/locations.service'
import { PropertiesService } from './services/properties.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Location]),
    ClientsModule.register([
      {
        name: process.env.PROPERTY_SERVICE_CLIENT || 'PROPERTY_SERVICE_CLIENT',
        transport: Transport.TCP,
        options: {
          host: process.env.PROPERTY_HOST ?? 'localhost',
          port: Number(process.env.PROPERTY_PORT || 3006),
        },
      },
    ]),
  ],
  controllers: [LocationsController],
  providers: [LocationsService, PropertiesService],
})
export class LocationsModule {}
