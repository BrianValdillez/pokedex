import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

export function startREPL(){ 
    const rl = createInterface({ 
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
     });

    rl.on('line', (line:string) => {
        const args = cleanInput(line);
        if (args.length == 0){
            rl.prompt();
            return;
        }

        console.log(`Your command was: ${args[0]}`);
        rl.prompt();
     });

     rl.prompt();
}

export function cleanInput(input: string): string[] {
    return input.trim().toLowerCase().split(/\s+/);
}