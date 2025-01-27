import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { CreatePropertyDto } from './dtos/create-property.dto'
import { UpdatePropertyDto } from './dtos/update-property.dto'
import { PropertiesPattern } from './patterns/properties.pattern'
import { PropertiesService } from './services/properties.service'

@Controller()
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @MessagePattern(PropertiesPattern.CREATE)
  create(@Payload() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(createPropertyDto)
  }

  @MessagePattern(PropertiesPattern.FIND_ALL)
  findAll() {
    return this.propertiesService.findAll()
  }

  @MessagePattern(PropertiesPattern.FIND_ONE)
  findOne(@Payload() id: number) {
    return this.propertiesService.findOne(id)
  }

  @MessagePattern(PropertiesPattern.UPDATE)
  update(@Payload() updatePropertyDto: UpdatePropertyDto) {
    return this.propertiesService.update(updatePropertyDto)
  }

  @MessagePattern(PropertiesPattern.REMOVE)
  remove(@Payload() id: number) {
    return this.propertiesService.remove(id)
  }

  @MessagePattern(PropertiesPattern.EXISTS)
  exists(@Payload() id: number) {
    return this.propertiesService.exists(id)
  }

  @MessagePattern(PropertiesPattern.FIND_PROPERTIES_AMOUNT)
  findPropertiesAmount() {
    return this.propertiesService.findPropertiesAmount()
  }
}
