import { IsNumber, IsString, Max, Min, MinLength } from 'class-validator';

export class CreateProducerDto {
  @IsString()
  @MinLength(5)
  name: string;

  @IsNumber()
  @Min(9)
  @Max(11)
  cpfCnjp: string;
}
