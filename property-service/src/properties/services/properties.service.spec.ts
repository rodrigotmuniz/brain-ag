import { Test, TestingModule } from '@nestjs/testing'
import { PropertiesService } from './properties.service'
import { DeepPartial, Repository } from 'typeorm'
import { Property } from '../entities/property.entity'
import { CropsService } from './crops.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { CreatePropertyDto } from '../dtos/create-property.dto'
import { NotFoundException } from '@nestjs/common'

describe('PropertiesService', () => {
  let service: PropertiesService
  let repository: Repository<Property>
  let cropsService: CropsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertiesService,
        {
          provide: getRepositoryToken(Property),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            findOneBy: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(), 
          },
        },
        {
          provide: CropsService,
          useValue: {
            propertyExistsOrFail: jest.fn()
          },
        },
      ],
    }).compile()

    service = module.get<PropertiesService>(PropertiesService)
    repository = module.get<Repository<Property>>(getRepositoryToken(Property))
    cropsService = module.get<CropsService>(CropsService)
  })

  it('Should test if property is defined', () => {
    expect(service).toBeDefined()
  })
  describe('create', () => {
    it('Should create a new property', async () => {
      const createPropertyDto: CreatePropertyDto = {
        agriculturalArea: 5,
        locationId: 1,
        name: 'Fazenda',
        producerId: 1,
        totalArea: 10,
        vegetationArea: 2,
      }
      const newProperty = Symbol('newProperty') as any
      const savedProperty = Symbol('savedProperty') as any

      jest.spyOn(repository, 'create').mockReturnValue(newProperty)
      jest.spyOn(repository, 'save').mockReturnValue(savedProperty)

      const result = await service.create(createPropertyDto)

      expect(repository.create).toHaveBeenCalledWith(createPropertyDto)
      expect(repository.save).toHaveBeenCalledWith(newProperty)
      expect(result).toEqual(savedProperty)
    })
  })

  describe('findOne', () => {
    it('Should find one property by id', async () => {
      const mockId = 1
      const foundProperty = Symbol('foundProperty') as any
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(foundProperty)

      const result = await service.findOne(mockId)

      expect(result).toEqual(foundProperty)
    })
  })

  describe('findByIdOrFail', () => {
    it('Should find one property by id', async () => {
      const mockId = 1
      const foundProperty = Symbol('foundProperty') as any
      jest.spyOn(repository, 'findOne').mockResolvedValue(foundProperty)

      const received = await service.findByIdOrFail(mockId)

      expect(received).toEqual(foundProperty)
    })
    it('Should throw an exception when id is not found', async () => {
      const foundProperty = null
      jest.spyOn(repository, 'findOne').mockResolvedValue(foundProperty)

      const receivedPromise = service.findByIdOrFail({} as any)

      await expect(receivedPromise).rejects.toThrow(NotFoundException)
    })
  })

  describe('update', () => {
    it('Should update one property by id', async () => {
      const mockuUpateProperty = Symbol('updateProperty') as any
      jest.spyOn(service, 'findByIdOrFail').mockResolvedValue({} as any)
      jest.spyOn(repository, 'create').mockReturnValue(mockuUpateProperty)
      jest.spyOn(repository, 'update').mockResolvedValue({} as any)
      
      const receive = await service.update({} as any)
      
      await expect(receive).toEqual(mockuUpateProperty)
    })
  })
  
  describe('remove', () => {
    it('Should remove one property by id', async () => {
      const mockId = 1
      const mockFoundProperty = Symbol('foundProperty') as any
      const mockRemovedProperty = Symbol('removedProperty') as any
      
      jest.spyOn(service, 'findByIdOrFail').mockResolvedValue(mockFoundProperty)
      jest.spyOn(cropsService, 'propertyExistsOrFail').mockResolvedValue({} as any)
      jest.spyOn(repository, 'remove').mockResolvedValue(mockRemovedProperty)

      const received = await service.remove(mockFoundProperty)

      expect(repository.remove).toHaveBeenCalledWith([mockFoundProperty]) 
      expect(received).toEqual(mockRemovedProperty)
    })
  })
})
