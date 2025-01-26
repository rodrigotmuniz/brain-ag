import { Injectable } from '@nestjs/common';
import { CreateCropDto } from './dto/create-crop.dto';
// import { UpdateCropDto } from './dto/update-crop.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crop } from './entities/crop.entity';

@Injectable()
export class CropsService {
  constructor(
    @InjectRepository(Crop)
    private readonly repository: Repository<Crop>,
  ) {}

  create(createCropDto: CreateCropDto) {
    console.log(createCropDto);
    return this.repository.find();
  }

  // findAll() {
  //   return `This action returns all crops`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} crop`;
  // }

  // update(id: number, updateCropDto: UpdateCropDto) {
  //   return `This action updates a #${id} crop`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} crop`;
  // }
}
