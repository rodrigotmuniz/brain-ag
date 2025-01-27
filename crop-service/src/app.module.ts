import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CropsModule } from './crops/crops.module';
import { APP_FILTER } from '@nestjs/core';
import { AppErrorFilter } from './crops/filters/app-error.filter';
import { AppHttpExceptionFilter } from './crops/filters/app-http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      // ignoreEnvFile: true // Only in servers that you dont pass the .env file directly
      // validationSchema// using joi
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
    {
      provide: APP_FILTER,
      useClass: AppErrorFilter,
    },
    {
      provide: APP_FILTER,
      useClass: AppHttpExceptionFilter,
    },
  ],
})
export class AppModule {}
