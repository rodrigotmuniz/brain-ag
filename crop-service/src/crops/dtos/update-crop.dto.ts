import { PartialType } from '@nestjs/mapped-types'
import { CreateCropDto } from './create-crop.dto';
import { IsPositive } from 'class-validator';

export class UpdateCropDto extends PartialType(CreateCropDto) {
    @IsPositive()
    id: number
}
