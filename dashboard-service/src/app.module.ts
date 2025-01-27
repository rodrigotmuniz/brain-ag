import { AppErrorFilter } from './dashboards/filters/app-error.filter'
import { AppHttpExceptionFilter } from './dashboards/filters/app-http-exception.filter'
import { LocationExistsValidator } from './dashboards/validators/location-exists.validator'
import { AppQueryFailedErrorFilter } from './dashboards/filters/app-query-failed-error.filter'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { DashboardsModule } from './dashboards/dashboards.module'
import { APP_FILTER } from '@nestjs/core'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    DashboardsModule,
  ],
  controllers: [],
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
