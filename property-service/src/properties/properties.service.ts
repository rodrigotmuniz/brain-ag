import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private readonly repository: Repository<Property>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto) {
    // const {
    //   agriculturalArea,
    //   locationId,
    //   name,
    //   producerId,
    //   totalArea,
    //   vegetationArea,
    // } = createPropertyDto;

    const product = this.repository.create(createPropertyDto);
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

  async update(id: number, data: UpdatePropertyDto ) {
    const {
      locationId,
      agriculturalArea,
      name,
      producerId,
      totalArea,
      vegetationArea,
    } = data;
    const product = await this.repository.findOneBy({ id });
    if (product) {
      const updateProduct = await this.repository.create({
        ...(locationId && { locationId }),
        ...(agriculturalArea && { agriculturalArea }),
        ...(name && { name }),
        ...(producerId && { producerId }),
        ...(totalArea && { totalArea }),
        ...(vegetationArea && { vegetationArea }),
      });
      const dbResult = await this.repository.update({ id }, updateProduct);
      return dbResult;
    }
  }

  async remove(id: number) {
    const property = await this.repository.findOneBy({ id });
    if (property) {
      const dbResult = await this.repository.remove([property]);
      return dbResult;
    }
  }
}
