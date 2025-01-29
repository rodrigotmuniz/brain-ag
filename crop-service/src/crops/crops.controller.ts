import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { CreateCropDto } from './dtos/create-crop.dto'
import { CropsPattern } from './patterns/crops.pattern'
import { CropsService } from './services/crops.service'
import { FindGroupedCropsDto } from './dtos/find-grouped-crops.dto'
import { UpdateCropDto } from './dtos/update-crop.dto'

@Controller()
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  @MessagePattern(CropsPattern.CREATE)
  create(@Payload() createCropDto: CreateCropDto) {
    return this.cropsService.create(createCropDto)
  }

  @MessagePattern(CropsPattern.FIND_ALL)
  findAll() {
    return this.cropsService.findAll()
  }

  @MessagePattern(CropsPattern.FIND_ONE)
  findOne(@Payload() id: number) {
    return this.cropsService.findOne(id)
  }

  @MessagePattern(CropsPattern.UPDATE)
  update(@Payload() updateCropDto: UpdateCropDto) {
    return this.cropsService.update(updateCropDto)
  }

  @MessagePattern(CropsPattern.REMOVE)
  remove(@Payload() id: number) {
    return this.cropsService.remove(id)
  }

  @MessagePattern(CropsPattern.EXISTS)
  exists(@Payload() id: number) {
    return this.cropsService.exists(id)
  }

  @MessagePattern(CropsPattern.FIND_GROUPED_CROPS)
  findGrouped(@Payload() findGroupedCropsDto: FindGroupedCropsDto) {
    return this.cropsService.findGrouped(findGroupedCropsDto.year)
  }

  @MessagePattern(CropsPattern.COMMODITY_EXISTS)
  commodityExists(@Payload() commodityId: number) {
    return this.cropsService.commodityExists(commodityId)
  }

  @MessagePattern(CropsPattern.PROPERTY_EXISTS)
  propertyExists(@Payload() propertyExists: number) {
    return this.cropsService.propertyExists(propertyExists)
  }
}
