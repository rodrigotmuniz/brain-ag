import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly repository: Repository<Location>,
  ) {}

  async create(createLocationDto: CreateLocationDto) {
    const product = this.repository.create({
      city: createLocationDto.city,
      state: createLocationDto.state,
    });

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

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    console.log('updateLocationDto', updateLocationDto);
    const product = await this.repository.findOneBy({ id });
    console.log('product', product)
    if (product) {
      const { city, state } = updateLocationDto;
      product.state = state ? state : product.state;
      product.city = city ? city : product.city;

      const updateProduct = this.repository.create(product)

      const dbResult = await this.repository.save(updateProduct);
      return dbResult;
    }
  }

  async remove(id: number) {
    const location = await this.repository.findOneBy({ id });
    if (location) {
      const dbResult = await this.repository.remove([location]);
      return dbResult;
    }
  }
}
