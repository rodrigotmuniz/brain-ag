import { Module } from '@nestjs/common';
import { CropsController } from './crops.controller';
import { CropsService } from './crops.service';

@Module({
  imports: [],
  controllers: [CropsController],
  providers: [CropsService],
})
export class CropsModule {}
