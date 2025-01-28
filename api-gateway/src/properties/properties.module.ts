import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { PropertiesController } from './properties.controller'

@Module({
  imports: [
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
  controllers: [PropertiesController],
})
export class PropertiesModule {
  constructor() {}
}
