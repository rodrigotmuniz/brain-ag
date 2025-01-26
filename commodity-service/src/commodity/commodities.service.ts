import { Injectable } from '@nestjs/common';
import { CreateCommodityDto } from './dto/create-commodity.dto';
import { UpdateCommodityDto } from './dto/update-commodity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Commodity } from './entities/commodity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommoditiesService {
  constructor(
    @InjectRepository(Commodity)
    private readonly repository: Repository<Commodity>,
  ) {}

  async create(createCommodityDto: CreateCommodityDto) {
    const product = this.repository.create(createCommodityDto);
    const dbResult = await this.repository.save(product);
    return dbResult;
  }

  async findAll() {
    const dbResult = await this.repository.find();
    return dbResult;
  }

  async findOne(id: number) {
    const dbResult = await this.repository.findOneBy({ id });
    return dbResult;
  }

  async update(updateCommodityDto: UpdateCommodityDto) {
    const product = await this.repository.preload(updateCommodityDto);
    if (product) {
      const dbResult = await this.repository.save(product);
      return dbResult;
    }
  }

  async remove(id: number) {
    const commodity = await this.repository.findOneBy({ id });
    if (commodity) {
      const dbResult = await this.repository.remove([commodity]);
      return dbResult;
    }
  }
}
