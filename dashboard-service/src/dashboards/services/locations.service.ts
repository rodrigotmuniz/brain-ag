import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { LocationsPattern } from '../patterns/locations.pattern';

@Injectable()
export class LocationsService {
  constructor(
    @Inject(process.env.LOCATION_SERVICE_CLIENT || 'LOCATION_SERVICE_CLIENT')
    private readonly clientProxy: ClientProxy,
  ) {}

  async findGroupedStates() {
    const observable = this.clientProxy.send(LocationsPattern.FIND_GROUPED_STATES, {});
    const groupedStates = await lastValueFrom(observable);
    return groupedStates;
  }
}
