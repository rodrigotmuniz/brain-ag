import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsSelect, In, Repository } from 'typeorm'
import { CreateLocationDto } from '../dtos/create-location.dto'
import { UpdateLocationDto } from '../dtos/update-location.dto'
import { Location } from '../entities/location.entity'
import { PropertiesService } from './properties.service'

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly repository: Repository<Location>,
    private readonly propertiesService: PropertiesService,
  ) {}

  async create(createLocationDto: CreateLocationDto) {
    const product = this.repository.create({
      city: createLocationDto.city,
      state: createLocationDto.state,
    })

    const dbResult = await this.repository.save(product)
    return dbResult
  }

  async findAll() {
    const dbResult = await this.repository.find()
    return dbResult
  }

  async findOne(id: number) {
    const dbResult = await this.repository.findOneBy({ id })
    return dbResult
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    const product = await this.repository.findOneBy({ id })
    if (product) {
      const { city, state } = updateLocationDto
      product.state = state ? state : product.state
      product.city = city ? city : product.city

      const updateProduct = this.repository.create(product)

      const dbResult = await this.repository.save(updateProduct)
      return dbResult
    }
  }

  async findByIdOrFail(id: number, select?: FindOptionsSelect<Location>) {
    const foundProducer = await this.repository.findOne({ where: { id }, select })
    if (!foundProducer) {
      throw new NotFoundException(`Location not found. No location exists with the provided ID: ${id}.`)
    }
    return foundProducer
  }

  async remove(id: number) {
    const [location] = await Promise.all([
      this.findByIdOrFail(id), //
      this.propertiesService.locationExistsOrFail(id),
    ])
    const removedLocation = await this.repository.remove([location])
    return removedLocation
  }

  async exists(id: number) {
    const dbResult = await this.repository.findOne({
      where: { id },
      select: { id: true },
    })
    return !!dbResult
  }

  async findGroupedStates() {
    return this.repository
      .createQueryBuilder()
      .select('state')
      .addSelect('COUNT(id)', 'count')
      .groupBy('state')
      .orderBy('count', 'DESC')
      .getRawMany()
  }

  async findByIds(ids: number[]) {
    const locations = await this.repository.find({ where: { id: In(ids) } })
    return locations
  }
}
