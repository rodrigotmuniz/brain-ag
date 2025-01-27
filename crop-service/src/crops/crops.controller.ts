// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Body, Controller, Get } from '@nestjs/common';
import { CreateCropDto } from './dtos/create-crop.dto';
import { CropsService } from './services/crops.service';
// import { UpdateCropDto } from './dto/update-crop.dto';
//
@Controller('crops')
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  @Get()
  create(@Body() createCropDto: CreateCropDto) {
    return this.cropsService.create(createCropDto);
  }

  // @Get()
  // findAll() {
  //   return this.cropsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.cropsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCropDto: UpdateCropDto) {
  //   return this.cropsService.update(+id, updateCropDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.cropsService.remove(+id);
  // }
}
