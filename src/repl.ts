import type { CLICommand, State } from './state.js';

export function startREPL(state: State){ 

    const rl = state.interface;

    rl.on('line', async (line:string) => {
        const args = cleanInput(line);
        const commands = state.commands;

        if (args.length > 0){
            const cmd = args[0];
            if (cmd in commands){
                try {
                    await commands[cmd].callback(state);
                } catch (error){
                    console.log("Network error!");
                }
                
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