import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { PropertiesService } from './properties.service'
import { LocationsService } from './locations.service'
import { CropsService } from './crops.service'

@Injectable()
export class DashboardsService {
  constructor(
    private readonly propertiesService: PropertiesService,
    private readonly locationsService: LocationsService,
    private readonly cropsService: CropsService,
  ) {}

  // async create(createDashboardDto: CreateDashboardDto) {
  //   const newDashboard = this.repository.create(createDashboardDto)
  //   const savedDashboard = await this.repository.save(newDashboard)
  //   return savedDashboard
  // }

  async findPropertiesAmount() {
    const propertiesAmount = await this.propertiesService.findPropertiesAmount()
    return propertiesAmount
  }

  async findTotalArea() {
    const totalAreaSum = await this.propertiesService.findTotalArea()
    return totalAreaSum
  }

  async findGroupedStates() {
    const totalAreaSum = await this.locationsService.findGroupedStates()
    return totalAreaSum
  }

  async findGroupedCrops(year: number) {
    const groupedCrops = await this.cropsService.findGrouped(year)
    return groupedCrops
  }

  // async findOne(id: number) {
  //   const foundDashboard = await this.repository.findOneBy({ id })
  //   return foundDashboard
  // }

  // async findByIdOrFail(id: number, select?: FindOptionsSelect<Dashboard>) {
  //   const foundDashboard = await this.repository.findOne({ where: { id }, select })
  //   if (!foundDashboard) {
  //     throw new NotFoundException(`Dashboard not found. No dashboard exists with the provided ID: ${id}.`)
  //   }
  //   return foundDashboard
  // }

  // async update(updateDashboardDto: UpdateDashboardDto) {
  //   const { id, ...payload } = updateDashboardDto
  //   const foundDashboard = await this.findByIdOrFail(id)

  //   const updateDashboard = this.repository.create({
  //     ...foundDashboard,
  //     ...payload,
  //   })

  //   await this.repository.update({ id }, payload)
  //   return updateDashboard
  // }

  // async remove(id: number) {
  //   const foundDashboard = await this.findByIdOrFail(id)
  //   const removedDashboard = await this.repository.remove([foundDashboard])
  //   return removedDashboard
  // }

  // async exists(id: number) {
  //   const foundDashboard = await this.repository.findOne({
  //     where: { id },
  //     select: { id: true },
  //   })
  //   return !!foundDashboard
  // }

  // private async existsOrFail(id: number) {
  //   const exists = await this.exists(id)
  //   if (!exists) {
  //     throw new NotFoundException(`Dashboard not found. No dashboard exists with the provided ID: ${id}.`)
  //   }
  //   return exists
  // }
}
