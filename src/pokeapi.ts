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
/*
  async fetchLocation(locationName: string): Promise<Location> {
    // implement this
  }
    */
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
    //pokemon_encounters: Encounter[]
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