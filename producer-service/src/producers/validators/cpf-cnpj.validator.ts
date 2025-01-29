import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { cpf, cnpj } from 'cpf-cnpj-validator';

@ValidatorConstraint({ name: 'CpfCnpjValidator', async: false })
@Injectable()
export class CpfCnpjValidator implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    if (!value || typeof value !== 'string') return false;
    return cpf.isValid(value) || cnpj.isValid(value);
  }

  defaultMessage(args: ValidationArguments): string {
    return `Invalid document: ${args.value} is neither a valid CPF nor a valid CNPJ.`;
  }
}
