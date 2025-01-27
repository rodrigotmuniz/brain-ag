import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { PropertiesController } from './properties.controller';
import { LocationsService } from './services/locations.service';
import { ProducersService } from './services/producers.service';
import { PropertiesService } from './services/properties.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Property]),
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
  controllers: [PropertiesController],
  providers: [PropertiesService, ProducersService, LocationsService],
})
export class PropertiesModule {}
