import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { People, PeopleDocument } from './people.schema';
import { Model } from 'mongoose';
import { PeopleFilterBuilder } from '../../design/people';

@Injectable()
export class PeopleService {
  constructor(@InjectModel(People.name) private peopleModel: Model<PeopleDocument>) { }

  async create(createPeopleDto: Partial<People>): Promise<PeopleDocument> {
    return this.peopleModel.create(createPeopleDto);
  }


  async findAll(filters: any): Promise<People[]> {
    const query = filters ? new PeopleFilterBuilder().build()(filters) : {};
    if (filters?.name) {
      query.name = { $regex: new RegExp(filters.name, 'i') };
    }
    return this.peopleModel.find(query).exec();
  }

  //para que el Cron me mantenga los datos actualizados 1 vez a la semana
  async deleteAll(): Promise<void> {
    try {
      await this.peopleModel.deleteMany({});
      console.log('Todos los registros de personas han sido eliminados');
    } catch (error) {
      console.error('Error al eliminar todas las personas:', error);
    }
  }
}