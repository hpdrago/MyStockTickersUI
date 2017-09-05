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
export class RestException
{
    private _exception: string;
    private _path: string;
    private _message: string;
    private _status: number;
    private _statusText: string;
    private _error: string;
    private _ok: boolean;
    private _url: string;

    constructor( exception: any )
    {
        /*
         * Convert the exception from JSON to a string, remove some of the extra characters
         * and then convert it back into an object and grab the individual values.
         */
        var exceptionObject = exception;

         /*
            JSON.parse( JSON.stringify( exception )
                                              .replace( /\\/g, "" )
                                              .replace( /"{"/g, "{\"" )
                                              .replace( /"}"/g, "\"}" ) ); */
        this._status = exceptionObject.status;
        this._url = exceptionObject.url;
        this._ok = exceptionObject.ok;
        /*
         * parse the body and extract the values
         */
        var bodyText = exceptionObject._body;
        try
        {
            var bodyObject = JSON.parse( bodyText );
            this._exception = bodyObject.exception;
            this._path = bodyObject.path;
            this._message = bodyObject.message;
            this._error = bodyObject.error;
            this._statusText = bodyObject.statusText;
        }
        catch( Error )
        {
           // ignore for now
        }
    }

    /**
     * Determines if the HTTP status code is duplicate key exists
     * @returns {boolean}
     */
    public isDuplicateKeyExists(): boolean
    {
        return this._status == 409 // CONFLICT;
    }

    get message(): string { return this._message; }
    get status(): number { return this._status; }
    get statusText(): string { return this._statusText; }
    get error(): string { return this._error; }
    get exception(): string { return this._exception; }
}
