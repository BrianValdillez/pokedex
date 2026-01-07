import { createInterface, type Interface } from "readline";

import { PokeAPI, type PokemonData } from './pokeapi.js';
import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
import { commandMap, commandMapBack } from './command_map.js';
import { commandExplore } from './command_explore.js';
import { commandCatch } from "./command_catch.js";
import { stringify } from "querystring";
import { commandInspect } from "./command_inspect.js";

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

    pokedex: Record<string, PokemonData>;
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
        catch: {
            name: "catch",
            description: "Throw a Pokeball at a given Pokemon",
            callback: commandCatch,
        },
        inspect: {
            name: "inspect",
            description: "Check the Pokedex for the given Pokemon",
            callback: commandInspect,
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

        pokedex: {},
    };
}