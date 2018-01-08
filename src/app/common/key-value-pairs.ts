import { KeyValuePair } from "./key-value-pair";

export class KeyValuePairs<K,V>
{
    private pairs: Array<KeyValuePair<K,V>> = [];

    public addPair( key: K, value: V ): void
    {
        this.pairs.push( new KeyValuePair( key, value ) );
    }

    public forEach( fn: (key: K, value: V) => any  )
    {
        this.pairs.forEach( (keyValuePair) => fn( keyValuePair.key, keyValuePair.value ) );
    }
}
