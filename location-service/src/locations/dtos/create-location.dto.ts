import { IsIn, IsNumber, IsString, Max, Min, MinLength } from 'class-validator';
import { BrazilianState } from '../entities/location.entity';

export class CreateLocationDto {
  @IsString()
  @IsIn([
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
  ], { message: 'State must be a valid Brazilian state abbreviation.' })
  state: BrazilianState;

  @IsString()
  city: string;

}
