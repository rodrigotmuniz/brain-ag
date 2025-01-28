import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER } from '@nestjs/core'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LocationsModule } from 'src/locations/locations.module'
import { AppAllExceptionsFilter } from './locations/filters/app-all-exceptions.filter'
import { AppErrorFilter } from './locations/filters/app-error.filter'
import { AppHttpExceptionFilter } from './locations/filters/app-http-exception.filter'
import { AppQueryFailedErrorFilter } from './locations/filters/app-query-failed-error.filter'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
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
    LocationsModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_FILTER, useClass: AppAllExceptionsFilter },
    { provide: APP_FILTER, useClass: AppErrorFilter },
    { provide: APP_FILTER, useClass: AppHttpExceptionFilter },
    { provide: APP_FILTER, useClass: AppQueryFailedErrorFilter },
  ],
})
export class AppModule {}
