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
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertiesPattern } from './properties.pattern';

@Controller('properties')
export class PropertiesController {
  constructor(
    @Inject(process.env.PROPERTY_SERVICE_CLIENT || 'PROPERTY_SERVICE_CLIENT')
    private readonly clientProxy: ClientProxy,
  ) {}

  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.clientProxy.send(PropertiesPattern.CREATE, createPropertyDto);
  }

  @Get()
  findAll() {
    return this.clientProxy.send(PropertiesPattern.FIND_ALL, {});
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientProxy.send(PropertiesPattern.FIND_ONE, id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.clientProxy.send(PropertiesPattern.UPDATE, {
      ...updatePropertyDto,
      id,
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clientProxy.send(PropertiesPattern.REMOVE, id);
  }
}
