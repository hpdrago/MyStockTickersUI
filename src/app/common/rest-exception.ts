/**
 * Created by mike on 11/10/2016.
 *
 * The exception object comes in the following form
 *  {
 *      "_body":{
 *      "timestamp":1478836711052,
 *          "status":409,
 *          "error":"Conflict",
 *          "exception":"com.stocktracker.repositorylayer.exceptions.DuplicateTickerSymbolException",
 *          "message":"Duplicate ticker symbol",
 *          "path":"/stocks"
 *  },
 *      "status":409,
 *      "ok":false,
 *      "statusText":"OK",
 *      "headers":{
 *      "content-type":[
 *          "application/json;charset=UTF-8"
 *      ]
 *  },
 *      "type":2,
 *      "url":"http://localhost:8080/stocks"
 *  }
 */
import { HttpErrorResponse } from '@angular/common/http';
import { isNullOrUndefined } from 'util';

export class RestException
{
    private _status: number;
    private _statusText: string;
    private _url: string;
    private _ok: boolean;
    private _name: string;
    private _timestamp: number;
    private _errorStatus: number;
    private _error: string;
    private _exception;
    private _message: string;
    private _path: string;

    constructor( exception: any )
    {
        if ( exception.error instanceof ErrorEvent )
        {
            // A client-side or network error occurred. Handle it accordingly.
            //.error( 'An error occurred:', exception.error.message );
            let errorEvent: ErrorEvent = exception.error;
            this._message = errorEvent.message;
            this._status = errorEvent.error;
        }
        else
        {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            /*
             * Convert the exception from JSON to a string, remove some of the extra characters
             * and then convert it back into an object and grab the individual values.
             */
            var httpErrorResponse: HttpErrorResponse  = exception;

            /*
             JSON.parse( JSON.stringify( exception )
             .replace( /\\/g, "" )
             .replace( /"{"/g, "{\"" )
             .replace( /"}"/g, "\"}" ) ); */
            this._status = httpErrorResponse.status;
            this._url = httpErrorResponse.url;
            this._ok = httpErrorResponse.ok;
            this._message = httpErrorResponse.message;
            this._statusText = httpErrorResponse.statusText;
            /*
             * parse the body and extract the values
             */
            ///let error = exceptionObject.error;
            if ( !isNullOrUndefined( httpErrorResponse.error ))
            try
            {
                //var error = JSON.parse(  );
                this._exception = httpErrorResponse.error.exception;
                this._path = httpErrorResponse.error.path;
                this._message = httpErrorResponse.error.message;
                this._error = httpErrorResponse.error.error;
                this._statusText = httpErrorResponse.error.statusText;
            }
            catch ( error )
            {
                console.error( error );
                // ignore for now
            }
        }
    }

    get message(): string { return this._message; }
    get status(): number { return this._status; }
    get statusText(): string { return this._statusText; }
    get exception(): string { return this._exception; }
    get timestamp(): number { return this._timestamp; }
    get error(): string { return this._error; }
    get path(): string { return this._path; }

    /**
     * Determines if the status code returned is 404 - Not Found.
     * @return {boolean}
     */
    public isNotFoundError(): boolean
    {
        return this.status == 404;
    }

    public isAuthorizationError()
    {
        return this.status == 401;
    }

    /**
     * Determines if the HTTP status code is duplicate key exists
     * @returns {boolean}
     */
    public isDuplicateKeyExists(): boolean
    {
        return this._status == 409 // CONFLICT;
    }
}
