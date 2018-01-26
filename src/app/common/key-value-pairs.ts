import { KeyValuePair } from "./key-value-pair";
import { isNullOrUndefined, isString } from 'util';
import { isNumeric } from 'rxjs/util/isNumeric';

/**
 * Manages an array of key modelObjectRows pairs.
 */
export class KeyValuePairs<K,V>
{
    private pairs: Array<KeyValuePair<K,V>> = [];

    /**
     * Add the key modelObjectRows pair to the list.
     * @param {K} key
     * @param {V} value if null, the pair is not added.
     */
    public addPair( key: K, value: V ): void
    {
        /*
         * Don't add empty, null, undefined, zero, "" values.
         */
        if ( isNullOrUndefined( value ))
        {
            return;
        }
        if ( isNumeric( value ))
        {
            if ( value <= 0 )
            {
                return;
            }
        }
        else if ( isString( value ) )
        {
            if ( value.length == 0 )
            {
                return;
            }
        }
        this.pairs.push( new KeyValuePair( key, value ) );
    }

    /**
     * Loop over each entry and apply fn.
     * @param {(key: K, modelObjectRows: V) => any} fn
     */
    public forEach( fn: (key: K, value: V) => any  )
    {
        this.pairs.forEach( (keyValuePair) => fn( keyValuePair.key, keyValuePair.value ) );
    }
}
