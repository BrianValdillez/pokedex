//import {type ShallowLocations} from './pokeapi.js';
import type { State } from './state.js';

export async function commandMap(state:State): Promise<void>{
    const url = state.nextLocationsURL;
    const response = await state.pokeapi.fetchLocations(url);

    state.nextLocationsURL = response.next;
    state.prevLocationsURL = response.previous;

    for (const areaResult of response.results){
        console.log(areaResult.name);
    }
}

export async function commandMapBack(state:State): Promise<void>{
    const url = state.prevLocationsURL;

    if (!url)
    {
        console.log("you're on the first page");
        return;
    }

    const response = await state.pokeapi.fetchLocations(url);

    state.nextLocationsURL = response.next;
    state.prevLocationsURL = response.previous;

    for (const areaResult of response.results){
        console.log(areaResult.name);
    }
}