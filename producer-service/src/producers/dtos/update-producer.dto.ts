import { PartialType } from '@nestjs/mapped-types';
import { CreateProducerDto } from './create-producer.dto';
import { IsNumber } from 'class-validator';

export class UpdateProducerDto extends PartialType(CreateProducerDto) {
  @IsNumber()
  id: number;
}
