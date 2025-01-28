import { AppErrorFilter } from './dashboards/filters/app-error.filter'
import { AppHttpExceptionFilter } from './dashboards/filters/app-http-exception.filter'
import { AppQueryFailedErrorFilter } from './dashboards/filters/app-query-failed-error.filter'
import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { DashboardsModule } from './dashboards/dashboards.module'
import { APP_FILTER } from '@nestjs/core'
import { AppAllExceptionsFilter } from './dashboards/filters/app-all-exceptions.filter'

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
      useClass: AppAllExceptionsFilter,
    },
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
