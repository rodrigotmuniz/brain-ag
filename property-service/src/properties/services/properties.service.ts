import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsSelect, Repository } from 'typeorm'
import { CreatePropertyDto } from '../dtos/create-property.dto'
import { UpdatePropertyDto } from '../dtos/update-property.dto'
import { Property } from '../entities/property.entity'
import { CropsService } from './crops.service'

@Injectable()
export class PropertiesService {
  private readonly logger = new Logger(PropertiesService.name)

  constructor(
    @InjectRepository(Property)
    private readonly repository: Repository<Property>,
    private readonly cropsService: CropsService,
  ) {}

  async create(createPropertyDto: CreatePropertyDto) {
    this.logger.log('Creating new property...')

    const newProperty = this.repository.create(createPropertyDto)
    const savedProperty = await this.repository.save(newProperty)

    this.logger.log(`Property created with ID: ${savedProperty.id}`)
    return savedProperty
  }

  async findAll() {
    this.logger.log('Fetching all properties...')

    const foundProperty = await this.repository.find()

    this.logger.log(`Found ${foundProperty.length} properties`)
    return foundProperty
  }

  async findOne(id: number) {
    this.logger.log(`Finding property with ID: ${id}...`)

    const foundProperty = await this.repository.findOneBy({ id })

    this.logger.log(`Property found: ${foundProperty ? 'Yes' : 'No'}`)
    return foundProperty
  }

  async findByIdOrFail(id: number, select?: FindOptionsSelect<Property>) {
    this.logger.log(`Finding property with ID: ${id} (or failing if not found)...`)

    const foundProperty = await this.repository.findOne({ where: { id }, select })
    if (!foundProperty) {
      this.logger.error(`Property not found. ID: ${id}`)
      throw new NotFoundException(`Property not found. No property exists with the provided ID: ${id}.`)
    }
    return foundProperty
  }

  async update(updatePropertyDto: UpdatePropertyDto) {
    this.logger.log(`Updating property with ID: ${updatePropertyDto.id}...`)

    const { id, ...payload } = updatePropertyDto
    const foundProperty = await this.findByIdOrFail(id)

    const updatedProperty = this.repository.create({
      ...foundProperty,
      ...payload,
    })

    await this.repository.update({ id }, payload)
    this.logger.log(`Property with ID: ${id} updated successfully`)
    return updatedProperty
  }

  async remove(id: number) {
    this.logger.log(`Removing property with ID: ${id}...`)

    const [foundProperty] = await Promise.all([
      this.findByIdOrFail(id),
      this.cropsService.propertyExistsOrFail(id),
    ])

    const removedProperty = await this.repository.remove([foundProperty])
    this.logger.log(`Property with ID: ${id} removed successfully`)
    return removedProperty
  }

  async exists(id: number) {
    this.logger.log(`Checking existence of property with ID: ${id}...`)

    const foundProperty = await this.repository.findOne({
      where: { id },
      select: { id: true },
    })
    this.logger.log(`Property with ID: ${id} ${foundProperty ? 'exists' : 'does not exist'}`)
    return !!foundProperty
  }

  async findPropertiesAmount() {
    this.logger.log('Finding total number of properties...')

    const propertiesAmount = await this.repository.count()

    this.logger.log(`Total properties: ${propertiesAmount}`)
    return { propertiesAmount }
  }

  async findTotalArea() {
    this.logger.log('Finding total area of all properties...')

    const totalAreaSum = await this.repository.sum('totalArea')

    this.logger.log(`Total area sum: ${totalAreaSum}`)
    return { totalAreaSum }
  }

  async findLandUsed() {
    this.logger.log('Finding total land used...')

    const landUsed = await this.repository
      .createQueryBuilder('properties')
      .select('SUM(properties.agriculturalArea)', 'agriculturalAreaSum')
      .addSelect('SUM(properties.vegetationArea)', 'vegetationAreaSum')
      .getRawMany()
      
    this.logger.log(`Land used - Agricultural Area: ${landUsed[0].agriculturalAreaSum}, Vegetation Area: ${landUsed[0].vegetationAreaSum}`)
    return { landUsed }
  }

  async producerExists(producerId: number) {
    this.logger.log(`Checking if producer with ID: ${producerId} exists...`)

    const foundProducer = await this.repository.findOne({
      where: { producerId },
      select: { id: true },
    })

    this.logger.log(`Producer with ID: ${producerId} ${foundProducer ? 'exists' : 'does not exist'}`)
    return !!foundProducer
  }

  async locationExists(locationId: number) {
    this.logger.log(`Checking if location with ID: ${locationId} exists...`)

    const foundLocation = await this.repository.findOne({
      where: { locationId },
      select: { id: true },
    })

    this.logger.log(`Location with ID: ${locationId} ${foundLocation ? 'exists' : 'does not exist'}`)
    return !!foundLocation
  }

  async groupLocations() {
    this.logger.log('Grouping locations...')

    const groupedLocations = await this.repository
      .createQueryBuilder('properties')
      .select('properties.locationId', 'locationId')
      .addSelect('COUNT(properties.locationId)', 'count')
      .groupBy('properties.locationId')
      .orderBy('count', 'DESC')
      .getRawMany()
      
    this.logger.log(`Grouped locations: ${groupedLocations.length} found`)
    return { groupedLocations }
  }
}
