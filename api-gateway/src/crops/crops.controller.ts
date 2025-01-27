import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { CreateCropDto } from './dtos/create-crop.dto'
import { UpdateCropDto } from './dtos/update-crop.dto'
import { CropsPattern } from './crops.pattern'

@Controller('crops')
export class CropsController {
  constructor(
    @Inject(process.env.CROPS_SERVICE_CLIENT || 'CROPS_SERVICE_CLIENT')
    private readonly clientProxy: ClientProxy,
  ) {
    // console.log('crops - clientProxy', clientProxy)
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
