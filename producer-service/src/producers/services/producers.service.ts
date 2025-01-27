import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProducerDto } from '../dtos/create-producer.dto';
import { UpdateProducerDto } from '../dtos/update-producer.dto';
import { Producer } from '../entities/producer.entity';

@Injectable()
export class ProducersService {
  constructor(
    @InjectRepository(Producer)
    private readonly repository: Repository<Producer>,
  ) {}

  async create(createProducerDto: CreateProducerDto) {
    const product = this.repository.create(createProducerDto);
    const dbResult = await this.repository.save(product);
    return dbResult;
  }

  async findAll() {
    const dbResult = await this.repository.find();
    return dbResult;
  }

  async findOne(id: number) {
    console.log('sdfasdfasçdlfajçsdlkfçalskdfçlajç', typeof id);
    const dbResult = await this.repository.findOneBy({ id });
    return dbResult;
  }

  async exists(id: number) {
    const dbResult = await this.repository.findOne({
      where: { id },
      select: { id: true },
    });
    return !!dbResult;
  }

  async update(updateProducerDto: UpdateProducerDto) {
    const product = await this.repository.preload(updateProducerDto);
    if (product) {
      const dbResult = await this.repository.save(product);
      return dbResult;
    }
  }

  async remove(id: number) {
    const producer = await this.repository.findOneBy({ id });
    if (producer) {
      const dbResult = await this.repository.remove([producer]);
      return dbResult;
    }
  }
}
