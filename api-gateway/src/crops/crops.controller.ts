import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { CropsPattern } from './crops.pattern'
import { CreateCropDto } from './dtos/create-crop.dto'
import { UpdateCropDto } from './dtos/update-crop.dto'

@Controller('crops')
export class CropsController {
  constructor(
    @Inject(process.env.CROP_SERVICE_CLIENT || 'CROP_SERVICE_CLIENT')
    private readonly clientProxy: ClientProxy,
  ) {
  }

  @Post()
  create(@Body() createCropDto: CreateCropDto) {
    return this.clientProxy.send(CropsPattern.CREATE, createCropDto)
  }

  @Get()
  findAll() {
    return this.clientProxy.send(CropsPattern.FIND_ALL, {})
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientProxy.send(CropsPattern.FIND_ONE, id)
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCropDto: UpdateCropDto) {
    return this.clientProxy.send(CropsPattern.UPDATE, {
      ...updateCropDto,
      id,
    })
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clientProxy.send(CropsPattern.REMOVE, id)
  }
}
