import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-producer.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
