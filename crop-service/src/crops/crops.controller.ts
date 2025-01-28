import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { CreateCropDto } from './dtos/create-crop.dto'
import { CropsPattern } from './patterns/crops.pattern'
import { CropsService } from './services/crops.service'
import { FindGroupedCropsDto } from './dtos/find-grouped-crops.dto'

@Controller()
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  @MessagePattern(CropsPattern.CREATE)
  create(@Payload() createCropDto: CreateCropDto) {
    console.log('create')
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
  update(@Payload() { id, ...data }: { id: number }) {
    console.log(data)
    return this.cropsService.update(id, data)
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
