import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { DashboardsPattern } from './dashboards.pattern'
import { CreateDashboardDto } from './dtos/create-dashboard.dto'
import { UpdateDashboardDto } from './dtos/update-dashboard.dto'

@Controller('dashboards')
export class DashboardsController {
  constructor(
    @Inject(process.env.DASHBOARDS_SERVICE_CLIENT || 'DASHBOARDS_SERVICE_CLIENT')
    private readonly clientProxy: ClientProxy,
  ) {
  }


  @Get('find-properties-amount')
  findPropertiesAmount() {
    console.log('findPropertiesAmount')
    return this.clientProxy.send(DashboardsPattern.FIND_PROPERTIES_AMOUNT, {})
  }

}
