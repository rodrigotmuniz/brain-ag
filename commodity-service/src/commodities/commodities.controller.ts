import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CommodityPattern } from './patterns/commodities.pattern';
import { CommoditiesService } from './commodities.service';
import { CreateCommodityDto } from './dtos/create-commodity.dto';
import { UpdateCommodityDto } from './dtos/update-commodity.dto';

@Controller()
export class CommoditiesController {
  constructor(private readonly commoditiesService: CommoditiesService) {}

  @MessagePattern(CommodityPattern.CREATE)
  create(@Payload() createCommodityDto: CreateCommodityDto) {
    return this.commoditiesService.create(createCommodityDto);
  }

  @MessagePattern(CommodityPattern.FIND_ALL)
  findAll() {
    return this.commoditiesService.findAll();
  }

  @MessagePattern(CommodityPattern.FIND_ONE)
  findOne(@Payload() id: number) {
    return this.commoditiesService.findOne(id);
  }

  @MessagePattern(CommodityPattern.UPDATE)
  update(@Payload() updateCommodityDto: UpdateCommodityDto) {
    return this.commoditiesService.update(updateCommodityDto);
  }

  @MessagePattern(CommodityPattern.REMOVE)
  remove(@Payload() id: number) {
    return this.commoditiesService.remove(id);
  }
}
