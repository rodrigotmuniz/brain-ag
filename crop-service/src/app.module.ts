import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { CropsModule } from './crops/crops.module'
import { APP_FILTER } from '@nestjs/core'
import { AppErrorFilter } from './crops/filters/app-error.filter'
import { AppHttpExceptionFilter } from './crops/filters/app-http-exception.filter'
import { AppQueryFailedErrorFilter } from './crops/filters/app-query-failed-error.filter'
import { AppAllExceptionsFilter } from './crops/filters/app-all-exceptions.filter'

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
    CropsModule,
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
