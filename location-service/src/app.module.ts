import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsModule } from 'src/locations/locations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      // ignoreEnvFile: true // Only in servers that you dont pass the .env file directly
      // validationSchema// using joi
    }),
    ClientsModule.register([
      {
        name: process.env.LOCATION_SERVICE_CLIENT || 'LOCATION_SERVICE_CLIENT',
        transport: Transport.TCP, // TCP communication
        options: {
          host: process.env.LOCATION_HOST ?? 'localhost',
          port: Number(process.env.PORT || 3004),
        }, // Microservice address
      },
    ]),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // entities: [Producer],
      autoLoadEntities: Boolean(process.env.DB_AUTOLOADENTITIES),
      synchronize: Boolean(process.env.DB_SYNCHRONIZE),
    }),
    LocationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    console.log();
  }
}
