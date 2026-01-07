import type { State } from './state.js';

export async function commandCatch(state:State, pkmnName: string): Promise<void>{

    pkmnName = pkmnName.toLowerCase();
    const pkmnData = await state.pokeapi.fetchPokemonData(pkmnName);

    if (pkmnData === undefined){
        console.log(`Could not identify requested Pokemon: ${pkmnName}`);
        return;
    }

    // List pokemon in area
    console.log(`Throwing a Pokeball at ${pkmnName}...`); 

    // Some random nonsense based off of the OG pokemon games but not great.
    const M = 1 + Math.random() * 254;
    const F = (3 *255 * 4) / (8 * 2);
    const is_caught = F >= M;
    if (!is_caught){
        console.log(`${pkmnName} escaped!`);
        return;
    }

    state.pokedex[pkmnName] = pkmnData;
    console.log(`${pkmnName} was caught!`);
    console.log("You may now inspect it with the inspect command.");
}