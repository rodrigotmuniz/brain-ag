import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CommoditiesPattern } from './commodities.pattern';
import { CreateCommodityDto } from './dto/create-commodity.dto';
import { UpdateCommodityDto } from './dto/update-commodity.dto';

@Controller('commodities')
export class CommoditiesController {
  constructor(
    @Inject(process.env.COMMODITY_SERVICE_CLIENT || 'COMMODITY_SERVICE_CLIENT')
    private readonly clientProxy: ClientProxy,
  ) {}

  @Post()
  create(@Body() createCommodityDto: CreateCommodityDto) {
    return this.clientProxy.send(CommoditiesPattern.CREATE, createCommodityDto);
  }

  @Get()
  findAll() {
    return this.clientProxy.send(CommoditiesPattern.FIND_ALL, {});
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientProxy.send(CommoditiesPattern.FIND_ONE, id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommodityDto: UpdateCommodityDto,
  ) {
    return this.clientProxy.send(CommoditiesPattern.UPDATE, {
      ...updateCommodityDto,
      id,
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clientProxy.send(CommoditiesPattern.REMOVE, id);
  }
}
