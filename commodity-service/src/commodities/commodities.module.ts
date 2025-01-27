import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommoditiesController } from './commodities.controller';
import { Commodity } from './entities/commodity.entity';
import { CommoditiesService } from './services/commodities.service';

@Module({
  imports: [TypeOrmModule.forFeature([Commodity])],
  controllers: [CommoditiesController],
  providers: [CommoditiesService],
})
export class CommoditiesModule {}
