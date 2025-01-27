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

  async existsOrFail(id: number) {
    const observable = this.clientProxy.send(LocationsPattern.EXISTS, id);
    const exists = await lastValueFrom<boolean>(observable);
    if (!exists) {
      throw new NotFoundException(`Location not found. No location exists with the provided ID: ${id}.`);
    }
    return exists;
  }

  async exists(id: number) {
    const observable = this.clientProxy.send(LocationsPattern.EXISTS, id);
    const exists = await lastValueFrom<boolean>(observable);
    return exists;
  }
}
