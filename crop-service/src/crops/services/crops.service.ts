import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsSelect, Repository } from 'typeorm'
import { CreateCropDto } from '../dtos/create-crop.dto'
import { UpdateCropDto } from '../dtos/update-crop.dto'
import { Crop } from '../entities/crop.entity'

@Injectable()
export class CropsService {
  constructor(
    @InjectRepository(Crop)
    private readonly repository: Repository<Crop>,
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
      .getRawMany()
    return { groupedCrops }
  }

  // async groupByCommodity(): Promise<{ commodityId: number; count: number }[]> {
  //   return this.cropRepository
  //     .createQueryBuilder('crop')
  //     .select('crop.commodityId', 'commodityId') // Select the commodityId
  //     .addSelect('COUNT(crop.id)', 'count') // Count the number of crops for each commodity
  //     .groupBy('crop.commodityId') // Group by commodityId
  //     .orderBy('count', 'DESC') // Optional: order by count in descending order
  //     .getRawMany(); // Execute and return raw results
  // }
}
