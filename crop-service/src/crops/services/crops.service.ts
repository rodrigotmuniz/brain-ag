import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsSelect, Repository } from 'typeorm'
import { CreateCropDto } from '../dtos/create-crop.dto'
import { UpdateCropDto } from '../dtos/update-crop.dto'
import { Crop } from '../entities/crop.entity'
import { CommoditiesService } from './commodities.service'

@Injectable()
export class CropsService {
  constructor(
    @InjectRepository(Crop)
    private readonly repository: Repository<Crop>,
    private readonly commoditiesService: CommoditiesService,
  ) {}

  async create(createCropDto: CreateCropDto) {
    const newCrop = this.repository.create(createCropDto)
    const savedCrop = await this.repository.save(newCrop)
    return savedCrop
  }

  async findAll() {
    const foundCrop = await this.repository.find()
    return foundCrop
  }

  async findOne(id: number) {
    const foundCrop = await this.repository.findOneBy({ id })
    return foundCrop
  }

  async findByIdOrFail(id: number, select?: FindOptionsSelect<Crop>) {
    const foundCrop = await this.repository.findOne({ where: { id }, select })
    if (!foundCrop) {
      throw new NotFoundException(`Crop not found. No crop exists with the provided ID: ${id}.`)
    }
    return foundCrop
  }

  async update(id: number, data: UpdateCropDto) {
    const foundCrop = await this.findByIdOrFail(id)

    const updateCrop = this.repository.create({
      ...foundCrop,
      ...data,
    })

    await this.repository.update({ id }, updateCrop)
    return updateCrop
  }

  async remove(id: number) {
    const foundCrop = await this.findByIdOrFail(id)
    const removedCrop = await this.repository.remove([foundCrop])
    return removedCrop
  }

  async exists(id: number) {
    const foundCrop = await this.repository.findOne({
      where: { id },
      select: { id: true },
    })
    return !!foundCrop
  }

  async findGrouped(year: number) {
    const groupedCrops = await this.repository
      .createQueryBuilder('crops')
      .select('crops.commodityId', 'commodityId')
      .addSelect('COUNT(crops.id)', 'count')
      .groupBy('crops.commodityId')
      .orderBy('count', 'DESC')
      .where('crops.year = :year', { year })
      .getRawMany<{ commodityId: number; count: number }>()

    const commodityIds = groupedCrops.map((groupedCrop) => groupedCrop.commodityId)
    const commodities = await this.commoditiesService.findBatchByIds(commodityIds)
    console.log('commodities', commodities)

    const groupedCropsWithCommodity = groupedCrops.map((groupedCrop) => ({
      commodity: commodities.find((commodity) => commodity.id === groupedCrop.commodityId),
      count: groupedCrop.count,
    }))

    return groupedCropsWithCommodity
  }
}
