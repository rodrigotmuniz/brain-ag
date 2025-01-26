import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommoditiesController } from './commodities.controller';
import { CommoditiesService } from './commodities.service';
import { Commodity } from './entities/commodity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Commodity])],
  controllers: [CommoditiesController],
  providers: [CommoditiesService],
})
export class CommoditiesModule {}
