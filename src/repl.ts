import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

import type { CLICommand } from './command.js';
import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';

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
    };
}

export function startREPL(){ 
    const commands = getCommands();

    const rl = createInterface({ 
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
     });

    rl.on('line', (line:string) => {
        const args = cleanInput(line);
        

        if (args.length > 0){
            const cmd = args[0];
            if (cmd in commands){
                commands[cmd].callback(commands);
                rl.prompt();
                return;
            }
            
        }

        console.log("Unknown command")
        rl.prompt();
        return;
     });

     rl.prompt();
}

export function cleanInput(input: string): string[] {
    return input.trim().toLowerCase().split(/\s+/);
}