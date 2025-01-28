import { Module } from '@nestjs/common'
import { ClientsModule } from '@nestjs/microservices'
import { CropsController } from './crops.controller'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: process.env.CROP_SERVICE_CLIENT || 'CROP_SERVICE_CLIENT',
        options: {
          host: process.env.CROP_HOST ?? 'localhost',
          port: Number(process.env.CROP_PORT || 3002),
        },
      },
    ]),
  ],
  controllers: [CropsController],
})
export class CropsModule {}
