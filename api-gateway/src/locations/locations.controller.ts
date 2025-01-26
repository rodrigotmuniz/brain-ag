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
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationsPattern } from './locations.pattern';

@Controller('locations')
export class LocationsController {
  constructor(
    @Inject(process.env.LOCATION_SERVICE_CLIENT || 'LOCATION_SERVICE_CLIENT')
    private readonly clientProxy: ClientProxy,
  ) {
    // console.log('locations - clientProxy', clientProxy)
  }

  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.clientProxy.send(LocationsPattern.CREATE, createLocationDto);
  }

  @Get()
  findAll() {
    console.log('location')
    const a=  this.clientProxy.send(LocationsPattern.FIND_ALL, {});
    console.log(a)
    return a
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientProxy.send(LocationsPattern.FIND_ONE, id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.clientProxy.send(LocationsPattern.UPDATE, {
      ...updateLocationDto,
      id,
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clientProxy.send(LocationsPattern.REMOVE, id);
  }
}
