type CacheEntry<T> = {
    createdAt: number;
    val: T;
};

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();

    
    #reapIntervalID:NodeJS.Timeout | undefined = undefined;
    #interval:number;

    constructor(reapInterval:number){
        this.#interval = reapInterval;
        this.#startReapLoop();
    }

    add<T>(key:string, val:T) {
        this.#cache.set(key, {
            createdAt: Date.now(),
            val: val,
        });
    }

    get<T>(key:string): T | undefined {
        const entry = this.#cache.get(key);
        return (entry !== undefined ? entry.val : undefined);
    }
 
    #reap(){
        const reap_val = Date.now() - this.#interval;
        for (const entry of this.#cache){
            //console.log(`Checking entry: ${entry[0]}...`);
            if (entry[1].createdAt < reap_val){
                //console.log(`Deleting Cache Entry: ${entry[0]}`);
                this.#cache.delete(entry[0]);
            }
        }
    }

    #startReapLoop() {
        this.#reapIntervalID = setInterval(() => this.#reap(), this.#interval);
    }

    stopReapLoop() {
        clearInterval(this.#reapIntervalID);
        this.#reapIntervalID = undefined;
    }
}