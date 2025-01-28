import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsSelect, Repository } from 'typeorm'
import { CreateProducerDto } from '../dtos/create-producer.dto'
import { UpdateProducerDto } from '../dtos/update-producer.dto'
import { Producer } from '../entities/producer.entity'
import { PropertiesService } from './properties.service'

@Injectable()
export class ProducersService {
  constructor(
    @InjectRepository(Producer)
    private readonly repository: Repository<Producer>,
    private readonly propertiesService: PropertiesService,
  ) {}

  async create(createProducerDto: CreateProducerDto) {
    const product = this.repository.create(createProducerDto)
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

  async findByIdOrFail(id: number, select?: FindOptionsSelect<Producer>) {
    const foundProducer = await this.repository.findOne({ where: { id }, select })
    if (!foundProducer) {
      throw new NotFoundException(`Producer not found. No producer exists with the provided ID: ${id}.`)
    }
    return foundProducer
  }

  async exists(id: number) {
    const dbResult = await this.repository.findOne({
      where: { id },
      select: { id: true },
    })
    return !!dbResult
  }

  async update(updateProducerDto: UpdateProducerDto) {
    const product = await this.repository.preload(updateProducerDto)
    if (product) {
      const dbResult = await this.repository.save(product)
      return dbResult
    }
  }

  async remove(id: number) {
    const [producer] = await Promise.all([
      this.findByIdOrFail(id), //
      this.propertiesService.producerExistsOrFail(id),
    ])
    const removedProducer = await this.repository.remove([producer])
    return removedProducer
  }
}
