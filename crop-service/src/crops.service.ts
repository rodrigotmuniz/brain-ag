import { Injectable } from '@nestjs/common';

@Injectable()
export class CropsService {
  getHello(): string {
    return 'Hello World!';
  }
}
