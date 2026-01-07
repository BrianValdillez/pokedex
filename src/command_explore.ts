import type { State } from './state.js';

export async function commandExplore(state:State, location: string): Promise<void>{

    const locationArea = await state.pokeapi.fetchLocationArea(location);

    if (locationArea === undefined){
        console.log(`Could not find requested location: ${location}`);
        return;
    }

    // List pokemon in area
    console.log('Found Pokemon:'); 
    for (const pkmn of locationArea.pokemon_encounters){
        console.log(`- ${pkmn.pokemon.name}`);
    }
}