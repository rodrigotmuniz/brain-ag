import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER } from '@nestjs/core'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommoditiesModule } from './commodities/commodities.module'
import { AppErrorFilter } from './commodities/filters/app-error.filter'
import { AppHttpExceptionFilter } from './commodities/filters/app-http-exception.filter'
import { AppQueryFailedErrorFilter } from './commodities/filters/app-query-failed-error.filter'
import { AppAllExceptionsFilter } from './commodities/filters/app-all-exceptions.filter'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      // ignoreEnvFile: true // Only in servers that you dont pass the .env file directly
      // validationSchema// using joi
    }),
    ClientsModule.register([
      {
        name: process.env.COMMODITY_SERVICE_CLIENT || 'COMMODITY_SERVICE_CLIENT',
        transport: Transport.TCP, // TCP communication
        options: {
          host: process.env.COMMODITY_HOST ?? 'localhost',
          port: Number(process.env.PORT || 3001),
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
    CommoditiesModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_FILTER, useClass: AppAllExceptionsFilter },
    { provide: APP_FILTER, useClass: AppErrorFilter },
    { provide: APP_FILTER, useClass: AppHttpExceptionFilter },
    { provide: APP_FILTER, useClass: AppQueryFailedErrorFilter },
  ]
})
export class AppModule {}
