export class BaseStarWarsDto {
  _id: string;
  films: string[];
  url?: string;
  created?: Date;
  edited?: Date;

  constructor(_id: string, films: string[], url?: string, created?: string, edited?: string) {
    this._id = _id;
    this.films = films;
    this.url = url;
    this.created = created ? new Date(created) : undefined; // Verificar antes de asignar
    this.edited = edited ? new Date(edited) : undefined; // Verificar antes de asignar
  }
}

export class CreateStarshipDto extends BaseStarWarsDto {
  name!: string;
  model!: string;
  starship_class!: string;
  manufacturer!: string;
  cost_in_credits!: string;
  length!: string;
  crew!: string;
  passengers!: string;
  max_atmosphering_speed!: string;
  hyperdrive_rating!: string;
  MGLT!: string;
  cargo_capacity!: string;
  consumables!: string;

  constructor(
    _id: string,
    name: string,
    model: string,
    starship_class: string,
    manufacturer: string,
    films: string[],
    cost_in_credits: string,
    length: string,
    crew: string,
    passengers: string,
    max_atmosphering_speed: string,
    hyperdrive_rating: string,
    MGLT: string,
    cargo_capacity: string,
    consumables: string,
    url?: string,
    created?: string,  
    edited?: string  
  ) {
    super(_id, films, url, created, edited);  
    this.name = name;
    this.model = model;
    this.starship_class = starship_class;
    this.manufacturer = manufacturer;
    this.cost_in_credits = cost_in_credits;
    this.length = length;
    this.crew = crew;
    this.passengers = passengers;
    this.max_atmosphering_speed = max_atmosphering_speed;
    this.hyperdrive_rating = hyperdrive_rating;
    this.MGLT = MGLT;
    this.cargo_capacity = cargo_capacity;
    this.consumables = consumables;
  }
}

export class CreatePlanetDto extends BaseStarWarsDto {
  name!: string;
  rotation_period!: string;
  orbital_period!: string;
  diameter!: string;
  climate!: string;
  gravity!: string;
  terrain!: string;
  surface_water!: string;
  population!: string;

  constructor(
    _id: string,
    name: string,
    rotation_period: string,
    orbital_period: string,
    diameter: string,
    climate: string,
    gravity: string,
    terrain: string,
    surface_water: string,
    population: string,
    films: string[],
    url?: string,
    created?: string, 
    edited?: string  
  ) {
    super(_id, films, url, created, edited); // Pasar los parámetros necesarios
    this.name = name;
    this.rotation_period = rotation_period;
    this.orbital_period = orbital_period;
    this.diameter = diameter;
    this.climate = climate;
    this.gravity = gravity;
    this.terrain = terrain;
    this.surface_water = surface_water;
    this.population = population;
  }
}

export class CreateFilmDto extends BaseStarWarsDto {
  title!: string;
  episode_id!: number;
  opening_crawl!: string;
  director!: string;
  producer!: string;
  release_date!: Date;

  constructor(
    _id: string,
    title: string,
    episode_id: number,
    opening_crawl: string,
    director: string,
    producer: string,
    release_date: string, // Cambiado a string para parsear en BaseStarWarsDto
    films: string[],
    url?: string
  ) {
    super(_id, films, url);
    this.title = title;
    this.episode_id = episode_id;
    this.opening_crawl = opening_crawl;
    this.director = director;
    this.producer = producer;
    this.release_date = new Date(release_date); // Asegurarse de convertir la cadena a Date
  }
}

export class CreatePeopleDto extends BaseStarWarsDto {
  name!: string;
  birth_year!: string;
  eye_color!: string;
  gender!: string;
  hair_color!: string;
  height!: string;
  mass!: string;
  skin_color!: string;
  homeworld?: string;

  constructor(
    _id: string,
    name: string,
    birth_year: string,
    eye_color: string,
    gender: string,
    hair_color: string,
    height: string,
    mass: string,
    skin_color: string,
    films: string[],
    url?: string,
    homeworld?: string // homeworld ahora es opcional
  ) {
    super(_id, films, url);
    this.name = name;
    this.birth_year = birth_year;
    this.eye_color = eye_color;
    this.gender = gender;
    this.hair_color = hair_color;
    this.height = height;
    this.mass = mass;
    this.skin_color = skin_color;
    this.homeworld = homeworld;
  }
}
