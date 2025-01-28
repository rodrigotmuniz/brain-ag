import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { DashboardsController } from './dashboards.controller'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: process.env.DASHBOARDS_SERVICE_CLIENT || 'DASHBOARDS_SERVICE_CLIENT',
        transport: Transport.TCP, // TCP communication
        options: {
          host: process.env.DASHBOARDS_HOST ?? 'localhost',
          port: Number(process.env.DASHBOARDS_PORT || 3003),
        },
      },
    ]),
  ],
  controllers: [DashboardsController],
})
export class DashboardsModule {}
