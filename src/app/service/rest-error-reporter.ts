import { RestException } from "../common/rest-exception";
import { BaseClass } from "../common/base-class";
import { Injectable } from "@angular/core";
import { ToastsManager } from "ng2-toastr";

/**
 * This class encapsulates the reporting of REST exceptions.
 */
@Injectable()
export class RestErrorReporter extends BaseClass
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     */
    constructor( protected toaster: ToastsManager )
    {
        super( toaster );
    }

    /**
     * Reports the error to the console and a visible message to the user.
     * @param rawJsonError The JSON text returned from the REST call
     */
    public reportRestError( rawJsonError ): RestException
    {
        var restException: RestException;
        this.log( "reportRestError: " + JSON.stringify( rawJsonError ) );
        if ( rawJsonError.status )
        {
            restException = new RestException( rawJsonError );
            var message = this.getExceptionMessage( restException );
            this.logError( message );
            this.showError( message );
        }
        else
        {
            this.logError( rawJsonError );
            this.showError( rawJsonError );
        }
        return restException;
    }

    /**
     * Formats the exception messsage
     * @param {RestException} restException
     * @return {string}
     */
    protected getExceptionMessage( restException: RestException ): string
    {
        this.debug( "getExceptionMessage: " + JSON.stringify( restException ));
        var message = restException.message;
        var status = restException.status;
        var error = restException.error;
        var exception = restException.exception;
        this.debug( "message: " + message );
        this.debug( "status: " + status );
        this.debug( "error: " + error );
        this.debug( "exception: " + exception );
        /*{
            message = `Error ${status} - ${error} - ${exception} - ${message}`;
        }*/
        return message;
    }
}
