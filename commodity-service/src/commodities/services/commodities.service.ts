import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsSelect, In, Repository } from 'typeorm'
import { CreateCommodityDto } from '../dtos/create-commodity.dto'
import { UpdateCommodityDto } from '../dtos/update-commodity.dto'
import { Commodity } from '../entities/commodity.entity'

@Injectable()
export class CommoditiesService {
  constructor(
    @InjectRepository(Commodity)
    private readonly repository: Repository<Commodity>,
  ) {}

  async create(createCommodityDto: CreateCommodityDto) {
    const newCommodity = this.repository.create(createCommodityDto)
    const savedCommodity = await this.repository.save(newCommodity)
    return savedCommodity
  }

  async findAll() {
    const foundCommodity = await this.repository.find()
    return foundCommodity
  }

  async findOne(id: number) {
    const foundCommodity = await this.repository.findOneBy({ id })
    return foundCommodity
  }

  async findByIdOrFail(id: number, select?: FindOptionsSelect<Commodity>) {
    const foundCommodity = await this.repository.findOne({ where: { id }, select })
    if (!foundCommodity) {
      throw new NotFoundException(`Commodity not found. No commodity exists with the provided ID: ${id}.`)
    }
    return foundCommodity
  }

  async update(updateCommodityDto: UpdateCommodityDto) {
    const { id, ...payload } = updateCommodityDto
    const foundCommodity = await this.findByIdOrFail(id)

    const updateCommodity = this.repository.create({
      ...foundCommodity,
      ...payload,
    })

    await this.repository.update({ id }, payload)
    return updateCommodity
  }

  async remove(id: number) {
    const foundCommodity = await this.repository.findOneBy({ id })
    if (foundCommodity) {
      const removedCommodity = await this.repository.remove([foundCommodity])
      return removedCommodity
    }
  }

  async exists(id: number) {
    const foundCommodity = await this.repository.findOne({
      where: { id },
      select: { id: true },
    })
    return !!foundCommodity
  }

  async findBatchByIds(ids: [number]) {
    const foundCommodities = await this.repository.find({
      where: { id: In(ids) },
    })
    return foundCommodities
  }
}
