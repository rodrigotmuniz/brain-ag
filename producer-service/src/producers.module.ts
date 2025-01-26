import { Module } from '@nestjs/common';
import { ProducersController } from './producers.controller';
import { ProducersService } from './producers.service';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      // ignoreEnvFile: true // Only in servers that you dont pass the .env file directly
      // validationSchema// using joi
    }),
    ClientsModule.register([
      {
        name: process.env.PRODUCER_SERVICE_CLIENT || 'PRODUCER_SERVICE_CLIENT',
        transport: Transport.TCP, // TCP communication
        options: {
          host: process.env.PRODUCER_HOST ?? 'localhost',
          port: Number(process.env.PORT || 3003),
        }, // Microservice address
      },
    ]),
  ],
  controllers: [ProducersController],
  providers: [ProducersService],
})
export class ProducersModule {
  // constructor() {
  //   console.log(process.env.PRODUCER_HOST, process.env.PORT);
  // }
}
