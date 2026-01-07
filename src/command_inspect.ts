import type { State } from './state.js';

export async function commandInspect(state:State, pkmnName: string): Promise<void>{
    pkmnName = pkmnName.toLowerCase();


    if (!(pkmnName in state.pokedex)){
        console.log(`No data registered for ${pkmnName}. You have not caught that pokemon`);
        return;
    }

    const pkmnData = state.pokedex[pkmnName];
    console.log(`Name: ${pkmnData.name}`);
    console.log(`Height: ${pkmnData.height}`);
    console.log(`Weight: ${pkmnData.weight}`);
    
    console.log(`Stats:`);
    for (const stat of pkmnData.stats){
        console.log(`\t-${stat.stat.name}: ${stat.base_stat}`);
    }

    console.log(`Types:`);
    for (const p_type of pkmnData.types){
        console.log(`\t-${p_type.type.name}`);
    }
}