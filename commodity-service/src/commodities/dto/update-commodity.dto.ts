import { PartialType } from '@nestjs/mapped-types';
import { CreateCommodityDto } from './create-commodity.dto';
import { IsNumber } from 'class-validator';

export class UpdateCommodityDto extends PartialType(CreateCommodityDto) {
  @IsNumber()
  id: number;
}
