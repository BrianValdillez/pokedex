import type { State } from './state.js';

export async function commandPokedex(state:State): Promise<void>{
    console.log(`Your Pokedex:`);

    if (Object.keys(state.pokedex).length === 0){
        console.log('\tNo Pokemon caught! Use the catch command to add to your Pokedex.');
        return;
    }

    for (const pkmn of Object.keys(state.pokedex)){
        console.log(`\t-${pkmn}`);
    }
}