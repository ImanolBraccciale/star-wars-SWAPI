import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Planets, PlanetsDocument } from './planets.schema';
import { Model } from 'mongoose';
import { PlanetsFilterBuilder } from '../../design//planets';

@Injectable()
export class PlanetsService {
    constructor(@InjectModel(Planets.name) private planetsModel: Model<PlanetsDocument>) {}
  
    async create(createPlanetDto: Partial<Planets>): Promise<PlanetsDocument> {
      return this.planetsModel.create(createPlanetDto)
    }
  
    async findAll(filters?: any): Promise<Planets[]> {
      const query = filters ? new PlanetsFilterBuilder().build()(filters) : {};
      if (filters?.name) {
        query.name = { $regex: new RegExp(filters.name, 'i') };
      }
      return this.planetsModel.find(query).exec();
  }
  async deleteAll(): Promise<void> {
    try {
      await this.planetsModel.deleteMany({});
      console.log('Todos los registros de planetas han sido eliminados');
    } catch (error) {
      console.error('Error al eliminar todas las planetas:', error);
    }
  }
  }