import { Test, TestingModule } from '@nestjs/testing'
import { PropertiesService } from './properties.service'
import { Repository } from 'typeorm'
import { Property } from '../entities/property.entity'
import { LocationsService } from './locations.service'

describe('PropertiesService', () => {
  let service: PropertiesService
  let repository: Repository<Property>
  let locationService: LocationsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertiesService],
    }).compile()
  })
})
