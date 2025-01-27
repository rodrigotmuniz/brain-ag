import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { CreateCommodityDto } from './dtos/create-commodity.dto'
import { UpdateCommodityDto } from './dtos/update-commodity.dto'
import { CommoditiesPattern } from './patterns/commodities.pattern'
import { CommoditiesService } from './services/commodities.service'

@Controller()
export class CommoditiesController {
  constructor(private readonly commoditiesService: CommoditiesService) {}

  @MessagePattern(CommoditiesPattern.CREATE)
  create(@Payload() createCommodityDto: CreateCommodityDto) {
    return this.commoditiesService.create(createCommodityDto)
  }

  @MessagePattern(CommoditiesPattern.FIND_ALL)
  findAll() {
    return this.commoditiesService.findAll()
  }

  @MessagePattern(CommoditiesPattern.FIND_ONE)
  findOne(@Payload() id: number) {
    return this.commoditiesService.findOne(id)
  }

  @MessagePattern(CommoditiesPattern.UPDATE)
  update(@Payload() updateCommodityDto: UpdateCommodityDto) {
    return this.commoditiesService.update(updateCommodityDto)
  }

  @MessagePattern(CommoditiesPattern.REMOVE)
  remove(@Payload() id: number) {
    return this.commoditiesService.remove(id)
  }

  @MessagePattern(CommoditiesPattern.EXISTS)
  exists(@Payload() id: number) {
    return this.commoditiesService.exists(id)
  }
}
