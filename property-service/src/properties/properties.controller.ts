import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreatePropertyDto } from './dtos/create-property.dto';
import { PropertyPattern } from './patterns/properties.pattern';
import { PropertiesService } from './services/properties.service';
import { UpdatePropertyDto } from './dtos/update-property.dto';

@Controller()
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @MessagePattern(PropertyPattern.CREATE)
  create(@Payload() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(createPropertyDto);
  }

  @MessagePattern(PropertyPattern.FIND_ALL)
  findAll() {
    return this.propertiesService.findAll();
  }

  @MessagePattern(PropertyPattern.FIND_ONE)
  findOne(@Payload() id: number) {
    return this.propertiesService.findOne(id);
  }

  @MessagePattern(PropertyPattern.UPDATE)
  update(@Payload() updatePropertyDto: UpdatePropertyDto) {
  // update(@Payload() {id, data}: {id: number, data: UpdatePropertyDto}) {
    return this.propertiesService.update(14, updatePropertyDto);
  }

  @MessagePattern(PropertyPattern.REMOVE)
  remove(@Payload() id: number) {
    return this.propertiesService.remove(id);
  }

  @MessagePattern(PropertyPattern.EXISTS)
  exists(@Payload() id: number) {
    return this.propertiesService.exists(id);
  }
}
