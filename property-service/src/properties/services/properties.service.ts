import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsSelect, Repository } from 'typeorm'
import { CreatePropertyDto } from '../dtos/create-property.dto'
import { UpdatePropertyDto } from '../dtos/update-property.dto'
import { Property } from '../entities/property.entity'

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private readonly repository: Repository<Property>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto) {
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

  async update(updatePropertyDto: UpdatePropertyDto) {
    const { id, ...payload } = updatePropertyDto
    const foundProperty = await this.findByIdOrFail(id)

    const updateProperty = this.repository.create({
      ...foundProperty,
      ...payload,
    })

    await this.repository.update({ id }, payload)
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

  async findPropertiesAmount() {
    const propertiesAmount = await this.repository.count()
    return { propertiesAmount }
  }

  async findTotalArea() {
    const totalAreaSum = await this.repository.sum('totalArea')
    return { totalAreaSum }
  }

  async findLandUsed() {
    const landUsed = await this.repository
      .createQueryBuilder('properties')
      .select('SUM(properties.agriculturalArea)', 'agriculturalAreaSum')
      .addSelect('SUM(properties.vegetationArea)', 'vegetationAreaSum')
      .getRawMany()
    return { landUsed }
  }
}
