import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { DashboardsController } from './dashboards.controller'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: process.env.DASHBOARD_SERVICE_CLIENT || 'DASHBOARD_SERVICE_CLIENT',
        transport: Transport.TCP,
        options: {
          host: process.env.DASHBOARD_HOST ?? 'localhost',
          port: Number(process.env.DASHBOARD_PORT || 3003),
        },
      },
    ]),
  ],
  controllers: [DashboardsController],
})
export class DashboardsModule {}
