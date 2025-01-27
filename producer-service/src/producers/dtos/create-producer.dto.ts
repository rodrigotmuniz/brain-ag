import { IsNumber, IsString, Matches, Max, Min, MinLength, Validate } from 'class-validator';
import { CpfCnpjValidator } from '../validators/cpf-cnpj.validator';

export class CreateProducerDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @Matches(/^\d*$/, { message: 'Input must contain only numeric characters' })
  @Validate(CpfCnpjValidator)
  cpfCnpj: string;
}
