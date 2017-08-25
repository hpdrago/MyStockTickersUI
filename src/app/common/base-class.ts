import { Logger } from "./logger";
import { LoggerFactory } from "./logger-factory";

/**
 * This is the BaseClass for all classes to provide common logging and other methods that are of value amongst all
 * objects of the application.
 */
export class BaseClass
{
    protected logger: Logger;
    constructor()
    {
        this.logger = LoggerFactory.getLogger( this.getClassName() );
        this.debug( "Constructor" );
    }

    /**
     * Logs a debug message
     * @param message
     */
    protected debug( message: string )
    {
        this.logger.debug( message );
    }

    /**
     * Logs an info message
     * @param message
     */
    protected log( message: string )
    {
        this.logger.log( message );
    }

    /**
     * Get the class name of this object
     */
    protected getClassName(): string
    {
        return (<any>this).constructor.name;
    }

}
