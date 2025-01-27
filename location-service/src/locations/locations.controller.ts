import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateLocationDto } from './dtos/create-location.dto';
import { LocationsPattern } from './patterns/locations.pattern';
import { LocationsService } from './services/locations.service';

@Controller()
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @MessagePattern(LocationsPattern.CREATE)
  create(@Payload() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }

  @MessagePattern(LocationsPattern.FIND_ALL)
  findAll() {
    return this.locationsService.findAll();
  }

  @MessagePattern(LocationsPattern.FIND_ONE)
  findOne(@Payload() id: number) {
    return this.locationsService.findOne(id);
  }

  @MessagePattern(LocationsPattern.UPDATE)
  update(@Payload() { id, ...data }) {
    return this.locationsService.update(id, data);
  }

  @MessagePattern(LocationsPattern.REMOVE)
  remove(@Payload() id: number) {
    return this.locationsService.remove(id);
  }

  @MessagePattern(LocationsPattern.EXISTS)
  exists(@Payload() id: number) {
    return this.locationsService.exists(id);
  }

  @MessagePattern(LocationsPattern.FIND_GROUPED_STATES)
  findGroupedStates() {
    return this.locationsService.findGroupedStates();
  }
}
