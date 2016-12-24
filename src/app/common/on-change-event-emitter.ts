import { EventEmitter } from "@angular/core";
import { LoggerFactory } from "./logger-factory";
import { Logger } from "./logger";

/**
 * This is a simple wrapper for the standard @agular/core EventEmitter.
 * It maintains the last value emitted and will only event a new event
 * if the value changes.  Therefore, multiple calls to the {@code emit} method
 * with the same value, will not result in the event being generated.
 *
 * Created by mike on 12/9/2016.
 */
export class OnChangeEventEmitter<T>
{
    private emitterName: string;
    private lastValue: T;
    private eventEmitter: EventEmitter<T> = new EventEmitter<T>();
    private logger: Logger;

    constructor( name?: string )
    {
        this.emitterName = name;
        this.logger = LoggerFactory.getLogger( OnChangeEventEmitter.name );
    }

    /**
     * Emit event with {@code value} if value is different than the last
     * value emitted.
     *
     * @param value
     */
    public emit( newValue: T )
    {
        if ( this.lastValue != newValue )
        {
            this.logger.log( "emit " + (this.emitterName ? this.emitterName + " " : " " ) +
                             JSON.stringify( newValue ));
            this.eventEmitter.emit( newValue );
        }
        this.lastValue = newValue;
    }
}
