import { /*type CacheEntry,*/ Cache } from './pokecache.js';
export class PokeAPI {
  private static readonly BASE_URL = "https://pokeapi.co/api/v2";
  private cache:Cache;

  constructor(cacheInterval:number) {
    this.cache = new Cache(cacheInterval);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    if (pageURL === undefined){
        pageURL = `${PokeAPI.BASE_URL}/location-area/`;
    }
    pageURL = pageURL.toLowerCase();

    const cachedJson = this.cache.get<ShallowLocations>(pageURL);
    if (cachedJson !== undefined){
      //console.log(`Cache Hit: ${pageURL}`);
      return cachedJson;
    }

    //console.log(`Cache MISS: ${pageURL}`);
    const response = await fetch(pageURL);
    const json = response.json();
    this.cache.add(pageURL, json);
    return json;
  }

  async fetchLocationArea(locationName: string): Promise<LocationArea | undefined> {
    const pageURL = `${PokeAPI.BASE_URL}/location-area/${locationName}`.toLowerCase();

    // Check cache
    const cachedData = this.cache.get<LocationArea>(pageURL);
    if (cachedData !== undefined){
      return cachedData;
    }

    // Retrieve + cache
    try{
      const response = await fetch(pageURL);
      const data = response.json();
      this.cache.add(pageURL, data);
      return data;
    }catch(error){
      if (error instanceof Error){
        console.log(error.message);
      }
      return undefined;
    }
  }

  async fetchPokemonData(pokemonName: string): Promise<PokemonData | undefined> {
    const pageURL = `${PokeAPI.BASE_URL}/pokemon/${pokemonName}`.toLowerCase();

    // Check cache
    const cachedData = this.cache.get<PokemonData>(pageURL);
    if (cachedData !== undefined){
      return cachedData;
    }

    // Retrieve + cache
    try{
      const response = await fetch(pageURL);
      const data = response.json();
      this.cache.add(pageURL, data);
      return data;
    }catch(error){
      if (error instanceof Error){
        console.log(error.message);
      }
      return undefined;
    }
  }
}

// Location List Response
export type ShallowLocations = {
    count: number;
    next?: string;
    previous?: string;
    results: LocationAreaResult[];
};

export type LocationAreaResult = {
    name: string;
    url: string;
};

export type LocationArea = {
    id: number;
    name: string;
    game_index: number;
    //encounter_method_rates
    location: Location;
    names: string[];
    pokemon_encounters: PokemonEncounter[]
};

export type PokemonEncounter = {
  pokemon: PokemonLookupData;
};

// This name + url combo is used in a couple of places; could consolidate into a single type
export type PokemonLookupData = {
  name: string;
  url: string;
};

export type LookupData = {
  name: string;
  url: string;
};

export type PokemonData = {
  id: number;
  name: string;

  base_experience: number;
  height: number;
  weight: number;

  types: { slot: number, type: LookupData }[];
  stats: { base_stat: number; effort: number; stat:LookupData }[];
};
/*
export type Location = {
    id: number;
    name: string;
    //region: Region;
    names: string[];
    //game_indices
    areas: ShallowLocations[];
};
*/