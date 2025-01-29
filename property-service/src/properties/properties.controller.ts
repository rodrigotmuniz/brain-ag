import { Controller, Logger } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { CreatePropertyDto } from './dtos/create-property.dto'
import { UpdatePropertyDto } from './dtos/update-property.dto'
import { PropertiesPattern } from './patterns/properties.pattern'
import { PropertiesService } from './services/properties.service'

@Controller()
export class PropertiesController {
  private readonly logger = new Logger(PropertiesController.name)

  constructor(private readonly propertiesService: PropertiesService) {}

  @MessagePattern(PropertiesPattern.CREATE)
  create(@Payload() createPropertyDto: CreatePropertyDto) {
    this.logger.log('Received request to create a new property')

    return this.propertiesService.create(createPropertyDto)
  }

  @MessagePattern(PropertiesPattern.FIND_ALL)
  findAll() {
    this.logger.log('Received request to find all properties')

    return this.propertiesService.findAll()
  }

  @MessagePattern(PropertiesPattern.FIND_ONE)
  findOne(@Payload() id: number) {
    this.logger.log(`Received request to find property with ID: ${id}`)

    return this.propertiesService.findOne(id)
  }

  @MessagePattern(PropertiesPattern.UPDATE)
  update(@Payload() updatePropertyDto: UpdatePropertyDto) {
    this.logger.log(`Received request to update property with ID: ${updatePropertyDto.id}`)

    return this.propertiesService.update(updatePropertyDto)
  }

  @MessagePattern(PropertiesPattern.REMOVE)
  remove(@Payload() id: number) {
    this.logger.log(`Received request to remove property with ID: ${id}`)

    return this.propertiesService.remove(id)
  }

  @MessagePattern(PropertiesPattern.EXISTS)
  exists(@Payload() id: number) {
    this.logger.log(`Received request to check if property with ID: ${id} exists`)

    return this.propertiesService.exists(id)
  }

  @MessagePattern(PropertiesPattern.FIND_PROPERTIES_AMOUNT)
  findPropertiesAmount() {
    this.logger.log('Received request to find the total number of properties')

    return this.propertiesService.findPropertiesAmount()
  }

  @MessagePattern(PropertiesPattern.FIND_TOTAL_AREA)
  findTotalArea() {
    this.logger.log('Received request to find the total area of all properties')

    return this.propertiesService.findTotalArea()
  }

  @MessagePattern(PropertiesPattern.FIND_LAND_USED)
  findLandUsed() {
    this.logger.log('Received request to find the total land used in properties')

    return this.propertiesService.findLandUsed()
  }

  @MessagePattern(PropertiesPattern.LOCATION_EXISTS)
  locationExists(@Payload() commodityId: number) {
    this.logger.log(`Received request to check if location with ID: ${commodityId} exists`)
    
    return this.propertiesService.locationExists(commodityId)
  }

  @MessagePattern(PropertiesPattern.PRODUCER_EXISTS)
  producerExists(@Payload() propertyExists: number) {
    this.logger.log(`Received request to check if producer exists for property with ID: ${propertyExists}`)

    return this.propertiesService.producerExists(propertyExists)
  }

  @MessagePattern(PropertiesPattern.GROUP_LOCATIONS)
  groupLocations() {
    this.logger.log('Received request to group locations by count')

    return this.propertiesService.groupLocations()
  }
}
