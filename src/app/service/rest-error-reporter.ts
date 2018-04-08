import { RestException } from "../common/rest-exception";
import { BaseClass } from "../common/base-class";
import { Injectable } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { isNullOrUndefined } from 'util';

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
     * This is Angular's suggested error handling routing for HttpClient calls.
     * @param {HttpErrorResponse} error
     * @return {ErrorObservable}
     */
    public handleError( error: HttpErrorResponse ): ErrorObservable
    {
        if ( error.error instanceof ErrorEvent )
        {
            // A client-side or network error occurred. Handle it accordingly.
            console.error( 'An error occurred:', error.error.message );
        }
        else
        {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}` );
        }
        // return an ErrorObservable with a user-facing error message
        return new ErrorObservable(
            'Something bad happened; please try again later.' );
    };

    /**
     * Reports the error to the console and a visible message to the user.
     * @param error The JSON text returned from the REST call
     */
    public reportRestError( error ): RestException
    {
        var restException: RestException;
        this.log( "reportRestError: " + JSON.stringify( error ) );
        if ( error.error instanceof ErrorEvent )
        {
            this.logAndReportError( error.error.message );
        }
        else
        {
            restException = new RestException( error );
            var message = this.getExceptionMessage( restException );
            this.logAndReportError( message );
        }
        return restException;
    }

    /**
     * Convert the HttpErrorResponse into a RestException.
     * @param {HttpErrorResponse} error
     * @return {RestException}
     */
    public getRestException( error: HttpErrorResponse )
    {
        let restException = new RestException( error );
        return restException;
    }

    /**
     * Logs the error and reports the error to the user.
     * @param {string} message
     */
    public logAndReportError( message: string )
    {
        this.debug( 'logAndReportError ' + message );
        this.logError( message );
        this.showError( message );
    }

    /**
     * Formats the exception messsage
     * @param {RestException} restException
     * @return {string}
     */
    protected getExceptionMessage( restException: any ): string
    {
        this.debug( "getExceptionMessage: " + JSON.stringify( restException ));
        let message = restException.message;
        let status = restException.status;
        let error = restException.error;
        let exception = restException.exception;
        this.debug( "message: " + message );
        this.debug( "status: " + status );
        this.debug( "error: " + error );
        this.debug( "exception: " + exception );
        if ( isNullOrUndefined( message ) &&
             isNullOrUndefined( status ) &&
             isNullOrUndefined( error ) &&
             isNullOrUndefined( exception ))
        {
            message = restException;
        }
        else if ( !isNullOrUndefined( status ) &&
                  !isNullOrUndefined( error ) &&
                  !isNullOrUndefined( exception ) &&
                  !isNullOrUndefined( message ))
        {
            message = `Error ${status} - ${error} - ${exception} - ${message}`;
        }
        return message;
    }
}
