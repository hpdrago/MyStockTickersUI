import { Logger } from "../../common/logger";
import { LoggerFactory } from "../../common/logger-factory";
import { OnChanges, SimpleChange } from "@angular/core";
import { RestException } from "../../common/rest-exception";
import { ToastsManager, Toast } from "ng2-toastr";

/**
 * This is the base class for all application components to contain common methods, services, and data
 * Created by mike on 11/27/2016.
 */
export abstract class BaseComponent implements OnChanges
{
    protected logger: Logger;

    constructor( protected toaster: ToastsManager )
    {
        this.logger = LoggerFactory.getLogger( this.getClassName() );
    }

    /**
     * This method is called for changes to the input data
     * @param changes
     */
    public ngOnChanges( changes: {[propertyName: string]: SimpleChange} )
    {
        for ( let propName in changes )
        {
            let change = changes[propName];
            let currentValue = change.currentValue;
            let previousValue = change.previousValue;
            this.inputPropertyChange( propName, previousValue, currentValue );
        }
    }

    /**
     * This method is called by {@code ngOnChanges} for each property that has changed.
     * @param property The name of the property that has changed.
     * @param previousValue The previous value.
     * @param currentValue The current value.
     */
    protected inputPropertyChange( property: string, previousValue: any, currentValue: any )
    {
        this.logger.log( `inputPropertyChange property: ${property} ${previousValue} ==> ${currentValue}`)
    }

    /**
     * Get the class name of this object
     */
    private getClassName(): string
    {
        return (<any>this).constructor.name;
    }

    /**
     * Reports the error to the console and a visible message to the user.
     * @param rawJsonError The JSON text returned from the REST call
     */
    protected reportRestError( rawJsonError ): RestException
    {
        var exception: RestException;
        this.logger.log( "reportRestError: " + JSON.stringify( rawJsonError ) );
        if ( rawJsonError.status )
        {
            exception = new RestException( rawJsonError );
            var errorMessage = exception.getMessage()
            if ( exception.isDuplicateKeyExists() )
            {
                errorMessage = this.getDuplicateKeyErrorMessage();
            }
            this.showError( errorMessage );
        }
        else
        {
            this.logger.log( "reportRestError: rawJsonError data does not have a status value" );
            this.showError( rawJsonError );
        }
        return exception;
    }

    /**
     * This method is called when a 409 HTTP Code is received from a rest call.
     * Override this method to customize the error message
     */
    protected getDuplicateKeyErrorMessage(): string
    {
        return 'Sorry, you are attempting to create a duplicate entry';
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
     * Defers the fn execution for 1 javascript cycle
     * @param fn
     */
    protected tickThenRun( fn: () => any )
    {
        setTimeout( fn, 0 );
    }

    /**
     * Display an error message to the user.
     * @param message
     * @return {Promise<Toast>}
     */
    protected showError( message: string ): Promise<Toast>
    {
        return this.toaster.error( message );
    }

    /**
     * Display a warning message to the user.
     * @param message
     * @return {Promise<Toast>}
     */
    protected showWarning( message: string ): Promise<Toast>
    {
        return this.toaster.warning( message );
    }

    /**
     * Display an info message tothe user.
     * @param message
     * @return {Promise<Toast>}
     */
    protected showInfo( message: string ) : Promise<Toast>
    {
        return this.toaster.info( message );
    }
}
