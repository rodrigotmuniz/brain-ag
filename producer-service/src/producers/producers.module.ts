import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Producer } from './entities/producer.entity'
import { ProducersController } from './producers.controller'
import { ProducersService } from './services/producers.service'
import { CpfCnpjValidator } from './validators/cpf-cnpj.validator'
import { PropertiesService } from './services/properties.service'
import { ClientsModule, Transport } from '@nestjs/microservices'

@Module({
  imports: [
    TypeOrmModule.forFeature([Producer]),
    ClientsModule.register([
      {
        name: process.env.PROPERTY_SERVICE_CLIENT || 'PROPERTY_SERVICE_CLIENT',
        transport: Transport.TCP, // TCP communication
        options: {
          host: process.env.PROPERTY_HOST ?? 'localhost',
          port: Number(process.env.PROPERTY_PORT || 3006),
        },
      },
    ]),
  ],
  controllers: [ProducersController],
  providers: [ProducersService, CpfCnpjValidator, PropertiesService],
})
export class ProducersModule {
  constructor() {
    console.log()
  }
}
