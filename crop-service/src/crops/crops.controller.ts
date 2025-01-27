import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { CreateCropDto } from './dtos/create-crop.dto'
import { CropPattern } from './patterns/crops.pattern'
import { CropsService } from './services/crops.service'

@Controller()
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  @MessagePattern(CropPattern.CREATE)
  create(@Payload() createCropDto: CreateCropDto) {
    return this.cropsService.create(createCropDto)
  }

  @MessagePattern(CropPattern.FIND_ALL)
  findAll() {
    return this.cropsService.findAll()
  }

  @MessagePattern(CropPattern.FIND_ONE)
  findOne(@Payload() id: number) {
    return this.cropsService.findOne(id)
  }

  @MessagePattern(CropPattern.UPDATE)
  update(@Payload() { id, ...data }: { id: number }) {
    console.log(data)
    return this.cropsService.update(id, data)
  }

  @MessagePattern(CropPattern.REMOVE)
  remove(@Payload() id: number) {
    return this.cropsService.remove(id)
  }

  @MessagePattern(CropPattern.EXISTS)
  exists(@Payload() id: number) {
    return this.cropsService.exists(id)
  }
}
