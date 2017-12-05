import { SessionService } from "../session.service";
import { AppConfigurationService } from "../app-configuration.service";
import { ModelObjectFactory } from "../../model/factory/model-object.factory";
import { Observable } from "rxjs/Observable";
import { Http, Response } from "@angular/http";
import { ModelObject } from "../../model/entity/modelobject";
import { BaseService } from "../base-service";
import { isNullOrUndefined } from "util";
import { PaginationPage } from "../../common/pagination";
import { PaginationURL } from "../../common/pagination-url";

/**
 * Generic class for reading model objects from the database.  Provides a method to read a single entity or a list
 * of entities all of which are of type <T> which extends ModelObject<T>.
 */
export abstract class ReadRestService<T extends ModelObject<T>>
    extends BaseService
{
    constructor( protected http: Http,
                 protected sessionService: SessionService,
                 protected appConfig: AppConfigurationService,
                 protected modelObjectFactory: ModelObjectFactory<T> )
    {
        super();
    }

    /**
     * This method combines the {baseUrl} + {customerUrl} + {contextUrl}.
     * Properly handles the conditional addition of hte customer url based on whether its null or not.
     * @param {T} modelObject
     * @returns {string}
     */
    protected getCreateOrReadURL( modelObject: T )
    {
        var contextURL = this.getContextURL( modelObject );
        if ( isNullOrUndefined( contextURL ) )
        {
            throw new ReferenceError( "getContextURL cannot return a null or undefined value" );
        }
        var customerURL = this.getCustomerURL() == null ? "/" : this.getCustomerURL();
        this.debug( "contextURL: " + contextURL + " customerURL: " + customerURL );
        return this.appConfig.getBaseURL() + contextURL + customerURL
    }

    /**
     * Each CRUD service must define the context URL.  This is the portion of the URL that defines the scope/context
     * of the REST service calls right after the protocol, host, and port.
     * @param modelObject (T) The context may be defined by model object properties.  Subclasses can customize the URL
     * based on these properties.
     * @returns {string}
     */
    protected abstract getContextURL( modelObject: T ): string;

    /**
     * Returns the customer portion of the url
     * @returns {string}
     */
    protected getCustomerURL(): string
    {
        return '/customer/' + this.sessionService.getLoggedInUserId();
    }

    /**
     * Defines the URL to load a single model object
     * @param {T} modelObject
     * @returns {string}
     */
    protected getReadModelObjectUrl( modelObject: T ): string
    {
        return this.getCreateOrReadURL( modelObject ) + '/' + modelObject.getPrimaryKey();
    }

    /**
     * Returns the URL string to Read a single model object via REST
     * @param modelObject
     */
    protected getReadModelObjectListUrl( modelObject: T ): string
    {
        return this.getCreateOrReadURL( modelObject );
        //var url: string = this.appConfig.getBaseURL() + this.getContextURL();
        //return `${this.appConfig.getBaseURL()}/${this.getContextURL()}/${this.sessionService.getLoggedInUserId()}`;
        /*
        if ( !isNullOrUndefined( modelObject.tickerSymbol ) )
        {
            url += '/' + stockToBuy.tickerSymbol;
        }
        */
        //return url;
    }

    /**
     * Serializes the object from a TypeScript object to a JSON object
     * @param {T} modelObject
     * @return {string} JSON
     */
    protected serialize( modelObject: T ): string
    {
        //var json: string = serialize( modelObject );
        var json: string = JSON.stringify( modelObject );
        return json;
    }

    /**
     * Retrieves the model object via REST.
     * Override {@code getReadModelObjectUrl( modelObject )} to get the correct REST URL
     * @param modelObject null, or instance of a modelObject that will be passed to the URL generation method to
     *        format an appropriate URL to retrieve the modelObject
     * @returns {Observable<T>}
     */
    public getModelObject( modelObject: T ): Observable<T>
    {
        var methodName = "getModelObject";
        this.debug( methodName + " query for: " + JSON.stringify( modelObject ) );
        if ( isNullOrUndefined( modelObject ) )
        {
            throw new ReferenceError( "modelObject is null or undefined" );
        }
        var url = this.getReadModelObjectUrl( modelObject );
        this.debug( methodName + " url: " + url );
        if ( isNullOrUndefined( url ) )
        {
            throw new ReferenceError( "url is null or undefined" );
        }
        return this.http
                   .get( url ) // ...using put request
                   .map( ( response: Response ) =>
                   {
                       this.debug( methodName + " received: " + JSON.stringify( response.json() ))
                       return this.modelObjectFactory.newModelObjectFromJSON( response.json() );
                   } ) // ...and calling .json() on the response to return data
                   .catch( ( error: any ) => Observable.throw( this.reportError( error ) ) )
                   .share();  // if there are multiple subscribers, without this call, the http call will be executed for each observer
    }

    /**
     * Get the stocks for a portfolio by the portfolio id
     * @param portfolioId
     * @returns {Observable<R>}
     */
    public getModelObjectList( modelObject: T ): Observable<Array<T>>
    {
        var methodName = "getModelObjectList";
        this.debug( methodName + " modelObject: " + this.serialize( modelObject ) );
        if ( isNullOrUndefined( modelObject ) )
        {
            throw new ReferenceError( "modelObject is null or undefined" );
        }
        var url: string = this.getReadModelObjectListUrl( modelObject );
        this.debug( methodName + " url: " + url );
        if ( isNullOrUndefined( url ) )
        {
            throw new ReferenceError( "url is null or undefined" );
        }
        return this.http
                   .get( url )
                   .map( ( response: Response ) =>
                   {
                       this.debug( methodName + " received response" );
                       var modelObjects: T[] = this.modelObjectFactory.newModelObjectArray( response.json() )
                       this.debug( methodName + " " + modelObjects.length + " model objects" );
                       return modelObjects;
                   })
                   .catch( ( error: any ) => Observable.throw( this.reportError( error ) ) )
                   .share();  // if there are multiple subscribers, without this call, the http call will be executed for each observer
    }

    /**
     * Retrieves a specific page of stocks
     * @param rowOffSet The page to retrieve
     * @param rows The numbers of rows per page (rows to return for this page)
     * @returns {Observable<PaginationPage<Stock>>}
     */
    public getPage( modelObject: T, rowOffSet: number, rows: number ): Observable<PaginationPage<T>>
    {
        let methodName = "getPage";
        let url = new PaginationURL( this.getReadModelObjectListUrl( modelObject ) ).getPage( rowOffSet, rows );
        this.logger.log( `${methodName} url: ${url} rowOffset: ${rowOffSet} rows: ${rows}` );
        try
        {
            return this.http
                       .get( url )
                       .map( ( response: Response ) =>
                             {
                                 return response.json();
                             })
                       .catch( ( error: any ) =>
                               {
                                   this.reportError( error );
                                   return Observable.throw( error.json().error || 'Server error' );
                               });
        }
        catch( exception )
        {
            this.reportError( exception );
        }
    }

}
