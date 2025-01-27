import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePropertyDto } from './dtos/create-property.dto';
import { UpdatePropertyDto } from './dtos/update-property.dto';
import { PropertiesPattern } from './properties.pattern';
import { lastValueFrom } from 'rxjs';

@Controller('properties')
export class PropertiesController {
  constructor(
    @Inject(process.env.PROPERTY_SERVICE_CLIENT || 'PROPERTY_SERVICE_CLIENT')
    private readonly clientProxy: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createPropertyDto: CreatePropertyDto) {
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
