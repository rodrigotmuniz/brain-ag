import { IsString, MinLength, IsNumber, Min, Max } from 'class-validator';

export class CreateCommodityDto {
  @IsString()
  @MinLength(5)
  name: string;
}
