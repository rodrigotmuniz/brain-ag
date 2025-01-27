import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { Producer } from './producers/entities/producer.entity'
import { ProducersModule } from './producers/producers.module'
import { APP_FILTER } from '@nestjs/core'
import { AppErrorFilter } from './producers/filters/app-error.filter'
import { AppHttpExceptionFilter } from './producers/filters/app-http-exception.filter'
import { AppQueryFailedErrorFilter } from './producers/filters/app-query-failed-error.filter'

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
        options: {
          host: process.env.PRODUCER_HOST ?? 'localhost',
          port: Number(process.env.PORT || 3005),
        },
      },
    ]),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: Boolean(process.env.DB_AUTOLOADENTITIES),
      synchronize: Boolean(process.env.DB_SYNCHRONIZE),
    }),
    ProducersModule,
  ],
  // controllers: [ProducersController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AppErrorFilter,
    },
    {
      provide: APP_FILTER,
      useClass: AppHttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: AppQueryFailedErrorFilter,
    },
  ],
})
export class AppModule {}
