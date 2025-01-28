import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { LocationsController } from './locations.controller'

@Module({
  imports: [
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
  ],
  controllers: [LocationsController],
})
export class LocationsModule {
  constructor() {
    console.log()
  }
}
