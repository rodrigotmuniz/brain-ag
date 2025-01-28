import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { DashboardsPattern } from './patterns/dashboards.pattern'
import { DashboardsService } from './services/dashboards.service'

@Controller()
export class DashboardsController {
  constructor(private readonly dashboardsService: DashboardsService) {}

  @MessagePattern(DashboardsPattern.FIND_PROPERTIES_AMOUNT)
  findPropertiesAmount() {
    return this.dashboardsService.findPropertiesAmount()
  }

  @MessagePattern(DashboardsPattern.FIND_TOTAL_AREA)
  findTotalArea() {
    return this.dashboardsService.findTotalArea()
  }

  @MessagePattern(DashboardsPattern.FIND_GROUPED_STATES)
  findGroupedStates() {
    return this.dashboardsService.findGroupedStates()
  }

  @MessagePattern(DashboardsPattern.FIND_GROUPED_CROPS)
  findGroupedCrops(@Payload() year: number) {
    return this.dashboardsService.findGroupedCrops(year)
  }

  @MessagePattern(DashboardsPattern.FIND_LAND_USED)
  findLandUsed() {
    return this.dashboardsService.findLandUsed()
  }
}
