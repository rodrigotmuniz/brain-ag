import { Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { DashboardsPattern } from './patterns/dashboards.pattern'
import { DashboardsService } from './services/dashboards.service'

@Controller()
export class DashboardsController {
  constructor(private readonly dashboardsService: DashboardsService) {}

  // @MessagePattern(DashboardPattern.CREATE)
  // create(@Payload() createDashboardDto: CreateDashboardDto) {
  //   return this.dashboardsService.create(createDashboardDto)
  // }

  @MessagePattern(DashboardsPattern.FIND_PROPERTIES_AMOUNT)
  findPropertiesAmount() {
    return this.dashboardsService.findPropertiesAmount()
  }

  @MessagePattern(DashboardsPattern.FIND_TOTAL_AREA)
  findTotalArea() {
    return this.dashboardsService.findTotalArea()
  }

  // @MessagePattern(DashboardPattern.FIND_ONE)
  // findOne(@Payload() id: number) {
  //   return this.dashboardsService.findOne(id)
  // }

  // @MessagePattern(DashboardPattern.UPDATE)
  // update(@Payload() updateDashboardDto: UpdateDashboardDto) {
  //   return this.dashboardsService.update(updateDashboardDto)
  // }

  // @MessagePattern(DashboardPattern.REMOVE)
  // remove(@Payload() id: number) {
  //   return this.dashboardsService.remove(id)
  // }

  // @MessagePattern(DashboardPattern.EXISTS)
  // exists(@Payload() id: number) {
  //   return this.dashboardsService.exists(id)
  // }
}
