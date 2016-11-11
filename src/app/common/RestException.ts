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
    private exception: string;
    private path: string;
    private message: string;
    private status: number;
    private url: string;

    constructor( exception: any )
    {
        /*
         * Convert the exception from JSON to a string, remove some of the extra characters
         * and then convert it back into an object and grab the individual values.
         */
        var exceptionObject = JSON.parse( JSON.stringify( exception )
                                              .replace( /\\/g, "" )
                                              .replace( /"{"/g, "{\"" )
                                              .replace( /"}"/g, "\"}" ) );
        this.exception = exceptionObject._body.exception;
        this.path = exceptionObject._body.path;
        this.message = exceptionObject._body.message;
        this.status = exceptionObject.status;
        this.url = exceptionObject.url;
    }

    /**
     * Returns the exception message, the status, and the path
     * @returns {string}
     */
    public formatGrowlMessage(): string
    {
        return `${this.message}.  Status: ${this.status}.  URL: ${this.path}`;
    }

    /**
     * Returns the exception message
     * @returns {string}
     */
    public getMessage(): string
    {
        return this.message;
    }
}
