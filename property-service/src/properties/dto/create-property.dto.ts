import {
  IsNumber,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @MinLength(5)
  name: string;

  @IsNumber()
  @IsPositive()
  totalArea: number;

  @IsNumber()
  @Min(0)
  agriculturalArea: number;

  @IsNumber()
  @Min(0)
  vegetationArea: number;

  @IsNumber()
  @IsPositive()
  producerId: number;

  @IsNumber()
  @IsPositive()
  locationId: number;
}
