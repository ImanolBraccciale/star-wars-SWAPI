import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Films, filmsDocument } from './films.schema';
import { FilmsFilterBuilder } from '../../design/films';
 
@Injectable()
export class FilmsService {
    constructor(@InjectModel(Films.name) private filmsModel: Model<filmsDocument>) { }

    async create(createFilmDto: Partial<Films>): Promise<filmsDocument> {
        return this.filmsModel.create(createFilmDto)
    }

    async findAll(filters?: any): Promise<Films[]> {
        const query = filters ? new FilmsFilterBuilder().build()(filters) : {};
        if (filters?.title) {
            query.title = { $regex: new RegExp(filters.title, 'i') };
          }
        return this.filmsModel.find(query).exec();
    }
    //para que el Cron me mantenga los datos actualizados 1 vez a la semana
    async deleteAll(): Promise<void> {
        try {
          await this.filmsModel.deleteMany({}); 
          console.log('Todos los registros de películas han sido eliminados');
        } catch (error) {
          console.error('Error al eliminar todas las películas:', error);
        }
      }
}
