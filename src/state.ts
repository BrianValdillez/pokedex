import { createInterface, type Interface } from "readline";

import { PokeAPI } from './pokeapi.js';
import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
import { commandMap, commandMapBack } from './command_map.js';
import { commandExplore } from './command_explore.js';

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>
};

export type State = {
    interface: Interface;
    commands: Record<string, CLICommand>;

    pokeapi: PokeAPI;
    nextLocationsURL?: string;
    prevLocationsURL?: string;
};

function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: "Move forward in the map list",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "Move back in the map list",
            callback: commandMapBack,
        },
        explore: {
            name: "explore",
            description: "Explore a given location",
            callback: commandExplore,
        },
    };
}

export function initState(): State {
    const rli = createInterface({ 
            input: process.stdin,
            output: process.stdout,
            prompt: "Pokedex > ",
         });

    return {
        interface: rli,
        commands: getCommands(),

        pokeapi: new PokeAPI(1000 * 30), // TODO: Change number????
        nextLocationsURL: undefined,
        prevLocationsURL: undefined,
    };
}