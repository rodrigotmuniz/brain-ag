import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsSelect, Repository } from 'typeorm'
import { CreatePropertyDto } from '../dtos/create-property.dto'
import { UpdatePropertyDto } from '../dtos/update-property.dto'
import { Property } from '../entities/property.entity'
import { LocationsService } from './locations.service'
import { ProducersService } from './producers.service'
import { LocationExistsValidator } from '../validators/location-exists.validator'

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private readonly repository: Repository<Property>,

    // private readonly producersService: ProducersService,
    // private readonly locationsService: LocationsService,
    // private readonly bla: LocationExistsValidator
  ) {}

  async create(createPropertyDto: CreatePropertyDto) {
    // await Promise.all([
    //   this.producersService.existsOrFail(createPropertyDto.producerId),
    //   this.locationsService.existsOrFail(createPropertyDto.locationId),
    // ])
    // this.bla.validate(1, {value: 1} as any)
    const newProperty = this.repository.create(createPropertyDto)

    const savedProperty = await this.repository.save(newProperty)
    return savedProperty
  }

  async findAll() {
    const foundProperty = await this.repository.find()
    return foundProperty
  }

  async findOne(id: number) {
    const foundProperty = await this.repository.findOneBy({ id })
    return foundProperty
  }

  async findByIdOrFail(id: number, select?: FindOptionsSelect<Property>) {
    const foundProperty = await this.repository.findOne({ where: { id }, select })
    if (!foundProperty) {
      throw new NotFoundException(`Property not found. No property exists with the provided ID: ${id}.`)
    }
    return foundProperty
  }

  async update(id: number, data: UpdatePropertyDto) {
    const foundProperty = await this.findByIdOrFail(id)

    const updateProperty = this.repository.create({
      ...foundProperty,
      ...data,
    })

    await this.repository.update({ id }, updateProperty)
    return updateProperty
  }

  async remove(id: number) {
    const foundProperty = await this.findByIdOrFail(id)
    const removedProperty = await this.repository.remove([foundProperty])
    return removedProperty
  }

  async exists(id: number) {
    const foundProperty = await this.repository.findOne({
      where: { id },
      select: { id: true },
    })
    return !!foundProperty
  }

  private async existsOrFail(id: number) {
    const exists = await this.exists(id)
    if (!exists) {
      throw new NotFoundException(`Property not found. No property exists with the provided ID: ${id}.`)
    }
    return exists
  }
}
