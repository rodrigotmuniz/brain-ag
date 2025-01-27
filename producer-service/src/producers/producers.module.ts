import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Producer } from './entities/producer.entity'
import { ProducersController } from './producers.controller'
import { ProducersService } from './services/producers.service'
import { CpfCnpjValidator } from './validators/cpf-cnpj.validator'

@Module({
  imports: [TypeOrmModule.forFeature([Producer])],
  controllers: [ProducersController],
  providers: [ProducersService, CpfCnpjValidator],
})
export class ProducersModule {
  constructor() {
    console.log()
  }
}
