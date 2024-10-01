import { Injectable, OnModuleInit } from '@nestjs/common';
import axios from 'axios';
import { FilmsService } from '../films/films.service';
import { PeopleService } from '../people/people.service';
import { StarshipsService } from '../starships/starships.service';
import { PlanetsService } from '../planets/planets.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class SyncService implements OnModuleInit {
  constructor(
    private readonly filmsService: FilmsService,
    private readonly peopleService: PeopleService,
    private readonly starshipsService: StarshipsService,
    private readonly planetsService: PlanetsService,
  ) {}
  //apenas se monte el componente, que limpie la db y cargue con los datos mas recinetes
  async onModuleInit() {
    await this.clearDatabase();
    await this.fetchAndStoreFilms();
    await this.fetchAndStorePeople();
    await this.fetchAndStoreStarships();
    await this.fetchAndStorePlanets();
  }

  @Cron('0 0 * * 0') // cada domingo
  async handleCron() {
    await this.clearDatabase();
    await this.fetchAndStoreFilms();
    await this.fetchAndStorePeople();
    await this.fetchAndStoreStarships();
    await this.fetchAndStorePlanets();
  }

  private async clearDatabase() {
    try {
      await this.filmsService.deleteAll(); 
      await this.peopleService.deleteAll(); 
      await this.starshipsService.deleteAll(); 
      await this.planetsService.deleteAll(); 
    } catch (error) {
      console.error('Error al limpiar la base de datos:', error);
    }
  }

  private async fetchAndStoreFilms() {
    try {
      let url = 'https://swapi.dev/api/films/';
      while (url) {
        const response = await axios.get(url);
        const films = response.data.results;

        for (const film of films) {
          await this.filmsService.create(film); 
        }
        url = response.data.next;  
      }
    } catch (error) {
      console.error('Error al obtener películas:', error);
    }
  }
  
  private async fetchAndStorePeople() {
    try {
      let url = 'https://swapi.dev/api/people/';
      while (url) {
        const response = await axios.get(url);
        const people = response.data.results;

        for (const person of people) {
          await this.peopleService.create(person); 
        }
        url = response.data.next;  
      }
    } catch (error) {
      console.error('Error al obtener personas:', error);
    }
  }

  private async fetchAndStoreStarships() {
    try {
      let url = 'https://swapi.dev/api/starships/';
      while (url) {
        const response = await axios.get(url);
        const starships = response.data.results;

        for (const starship of starships) {
          await this.starshipsService.create(starship); 
        }
        url = response.data.next;  
      }
    } catch (error) {
      console.error('Error al obtener naves estelares:', error);
    }
  }

  private async fetchAndStorePlanets() {
    try {
      let url = 'https://swapi.dev/api/planets/';
      while (url) {
        const response = await axios.get(url);
        const planets = response.data.results;

        for (const planet of planets) {
          await this.planetsService.create(planet); 
        }
        url = response.data.next; 
      }
    } catch (error) {
      console.error('Error al obtener planetas:', error);
    }
  }
}
