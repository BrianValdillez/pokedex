import type {CLICommand} from './command';

export function commandHelp(commands: Record<string, CLICommand>){
    console.log("Welcome to the Pokedex!");
    console.log("Usage:\n");

    for (const key in commands){
        const command = commands[key];
        console.log(`${command.name}: ${command.description}`);
    }
}