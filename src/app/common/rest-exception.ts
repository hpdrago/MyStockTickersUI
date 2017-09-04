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
    private error: string;
    private ok: boolean;
    private url: string;

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
        this.status = exceptionObject.status;
        this.url = exceptionObject.url;
        this.ok = exceptionObject.ok;
        /*
         * parse the body and extract the values
         */
        var bodyText = exceptionObject._body;
        var bodyObject = JSON.parse( bodyText );
        this.exception = bodyObject.exception;
        this.path = bodyObject.path;
        this.message = bodyObject.message;
        this.error = bodyObject.error;
    }

    /**
     * Determines if the HTTP status code is duplicate key exists
     * @returns {boolean}
     */
    public isDuplicateKeyExists(): boolean
    {
        return this.status == 409 // CONFLICT;
    }

    public getMessage(): string
    {
        return this.message;
        /*
        return this.message.replace( /\\/g, "" )
                           .replace( /"{"/g, "{\"" )
                           .replace( /"}"/g, "\"}" );*/
    }

    public getStatus(): number { return this.status; }
    public getError(): string { return this.error; }
    public getException(): string { return this.exception; }
}
