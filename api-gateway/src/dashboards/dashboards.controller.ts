import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { DashboardsPattern } from './dashboards.pattern'

@Controller('dashboards')
export class DashboardsController {
  constructor(
    @Inject(process.env.DASHBOARD_SERVICE_CLIENT || 'DASHBOARD_SERVICE_CLIENT')
    private readonly clientProxy: ClientProxy,
  ) {}

  @Get('find-properties-amount')
  findPropertiesAmount() {
    return this.clientProxy.send(DashboardsPattern.FIND_PROPERTIES_AMOUNT, {})
  }

  @Get('find-total-area')
  findTotalArea() {
    return this.clientProxy.send(DashboardsPattern.FIND_TOTAL_AREA, {})
  }

  @Get('find-grouped-states')
  findGroupStates() {
    return this.clientProxy.send(DashboardsPattern.FIND_GROUPED_STATES, {})
  }

  @Get('find-grouped-crops/:year')
  findGroupedCrops(@Param('year', ParseIntPipe) year: number) {
    return this.clientProxy.send(DashboardsPattern.FIND_GROUPED_CROPS, { year })
  }

  @Get('find-land-used')
  findLandUsed() {
    return this.clientProxy.send(DashboardsPattern.FIND_LAND_USED, {})
  }
}
