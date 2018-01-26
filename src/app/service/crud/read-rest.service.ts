import { SessionService } from "../session.service";
import { AppConfigurationService } from "../app-configuration.service";
import { ModelObjectFactory } from "../../model/factory/model-object.factory";
import { Observable } from "rxjs/Observable";
import { Http, Response } from "@angular/http";
import { ModelObject } from "../../model/entity/modelobject";
import { BaseService } from "../base-service";
import { isNullOrUndefined, isNumber } from "util";
import { PaginationPage } from "../../common/pagination";
import { PaginationURL } from "../../common/pagination-url";
import { KeyValuePairs } from "../../common/key-value-pairs";
import { KeyValuePair } from "../../common/key-value-pair";
import { LazyLoadEvent } from "primeng/primeng";
import { RestErrorReporter } from '../rest-error-reporter';

/**
 * Generic class for reading model objects from the database.  Provides a method to read a single entity or a list
 * of entities all of which are of type <T> which extends ModelObject<T>.
 */
export abstract class ReadRestService<T extends ModelObject<T>>
    extends BaseService
{
    /**
     * Constructor.
     * @param {Http} http
     * @param {SessionService} sessionService
     * @param {AppConfigurationService} appConfig
     * @param {ModelObjectFactory<T extends ModelObject<T>>} modelObjectFactory
     * @param {RestErrorReporter} restErrorReporter
     */
    constructor( protected http: Http,
                 protected sessionService: SessionService,
                 protected appConfig: AppConfigurationService,
                 protected restErrorReporter: RestErrorReporter,
                 protected modelObjectFactory: ModelObjectFactory<T> )
    {
        super();
    }

    /**
     * This method is called to create a new entity.  It combines the {baseUrl} + {contextBaseURL} + {customerURL}.
     * @returns {string}
     */
    protected getCreateModelObjectUrl(): string
    {
        var methodName = "getCreateModelObjectUrl";
        this.debug( methodName + ".begin" );
        var contextURL = this.getContextBaseURL();
        if ( isNullOrUndefined( contextURL ) )
        {
            throw new ReferenceError( methodName +" cannot return a null or undefined value" );
        }
        var customerURL = this.getCustomerURL() == null ? "/" : this.getCustomerURL();
        this.debug( methodName + " contextURL: " + contextURL + " customerURL: " + customerURL );
        var url = this.appConfig.getBaseURL() + contextURL + customerURL;
        this.debug( methodName + " url: " + url );
        return url;
    }

    /**
     * This method is called to read an entity.  It combines the {baseUrl}  + {contextUrl} + {customerUrl} to create
     * the REST url.  The contextURL will contain any key/value pairs as returned by {@code getContextURLKeyValues}.
     * @param {T} modelObject
     * @returns {string}
     */
    protected getReadModelObjectURL( modelObject: T ): string
    {
        var methodName = "getReadModelObjectURL";
        var contextURL = this.getContextURL( modelObject );
        this.debug( methodName + " " + JSON.stringify( modelObject ));
        if ( isNullOrUndefined( contextURL ) )
        {
            throw new ReferenceError( methodName +" cannot return a null or undefined value" );
        }
        var customerURL = this.getCustomerURL() == null ? "/" : this.getCustomerURL();
        this.debug( methodName + " contextURL: " + contextURL + " customerURL: " + customerURL );
        var url = this.appConfig.getBaseURL() + contextURL + customerURL;
        this.debug( methodName + " url: " + url );
        return url;
    }

    /**
     * Each CRUD service must define the context URL.  This is the portion of the URL that defines the scope/context
     * of the REST service calls right after the protocol, host, and port.
     * @param modelObject (T) The context may be defined by model object properties.  Subclasses can customize the URL
     * based on these properties.
     * @returns {string}
     */
    protected abstract getContextBaseURL(): string;

    /**
     * This method customizes the context URL to include the primary key of the model object.  If the model object is
     * not set (null or undefined), then just the context based url (@code getContextBaseURL) is return. If the model
     * object is set, then the non-null values are extracted from the model object and added to the query.
     * @param {T} modelObject
     * @returns {string}
     */
    protected getContextURL( modelObject: T ): string
    {
        let methodName = "getContextURL";
        this.debug( methodName + " " + JSON.stringify( modelObject ));
        let contextURL = this.getContextBaseURL();
        let keyColumnValues: KeyValuePairs<string,any> = this.getContextURLKeyValues( modelObject );
        keyColumnValues.forEach( (key, value) => contextURL += "/" + key + "/" + value );
        this.debug( methodName + " contextURL: " + contextURL );
        return contextURL;
    }

    /**
     * This method will return a KeyValuePair for the primary key value of the {@code modelObject}
     * @param {T} modelObject
     * @returns {KeyValuePair<string, any>}
     */
    protected getContextPrimaryURLKeyValue( modelObject: T ): KeyValuePair<string,any>
    {
        return new KeyValuePair<string, any>( modelObject.getPrimaryKeyName(), modelObject.getPrimaryKeyValue() );
    }

    /**
     * Returns the list of key value pairs to add to the URL.  By default, only the primary key value is checked and
     * added to the URL.  Subclasses should override this method to add different key/value pairs.
     * @param {T} modelObject
     * @param {string} primaryKey
     * @returns list of key value pairs, key=column name,value=column value.
     */
    protected getContextURLKeyValues( modelObject: T ): KeyValuePairs<string,any>
    {
        let primaryKeyValue: any = null;

        let keyValuePairs: KeyValuePairs<string,any> = new KeyValuePairs<string, any>();
        /*
         * Determine if there is a primary key to add to the URL
         */
        if ( !isNullOrUndefined( modelObject ) )
        {
            if ( isNumber( modelObject.getPrimaryKeyValue() ) )
            {
                if ( modelObject.getPrimaryKeyValue() > 0 )
                {
                    primaryKeyValue = modelObject.getPrimaryKeyValue();
                }
            }
            else
            {
                primaryKeyValue = modelObject.getPrimaryKeyValue();
            }
        }
        if ( primaryKeyValue != null )
        {
            keyValuePairs.addPair( modelObject.getPrimaryKeyName(), primaryKeyValue );
        }
        return keyValuePairs;
    }

    /**
     * Returns the customer portion of the url
     * @returns {string}
     */
    protected getCustomerURL(): string
    {
        return '/customer/' + this.sessionService.getLoggedInUserId();
    }

    /**
     * Returns the URL string to Read a single model object via REST
     * @param modelObject
     */
    protected getReadModelObjectListUrl( modelObject: T ): string
    {
        var methodName = "getReadModelObjectListUrl";
        this.debug( methodName + " " + JSON.stringify( modelObject ));
        var customerURL = this.getCustomerURL();
        if ( isNullOrUndefined( customerURL ) )
        {
            throw new ReferenceError( "getCustomerURL cannot return a null or undefined value" );
        }
        this.debug( methodName + " customerURL: " + customerURL );
        var contextURL = this.getContextURL( modelObject );
        var url: string = '';
        if ( isNullOrUndefined( contextURL ) )
        {
            url = this.appConfig.getBaseURL() + customerURL
        }
        else
        {
            url = this.appConfig.getBaseURL() + contextURL + customerURL
        }
        this.debug( methodName + " contextURL: " + contextURL + " customerURL: " + customerURL );
        this.debug( methodName + " url: " + url );
        return url;
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
        var url = this.getReadModelObjectURL( modelObject );
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
                   .catch( ( error: any ) =>
                           {
                               this.restErrorReporter.reportRestError( error );
                               return Observable.throw( error )
                           } )
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
                       this.debug( methodName + " received response " + JSON.stringify(response) );
                       var modelObjects: T[] = this.modelObjectFactory.newModelObjectArray( response.json() )
                       this.debug( methodName + " " + modelObjects.length + " model objects" );
                       //this.debug( methodName + " " + JSON.stringify( modelObjects ));
                       return modelObjects;
                   })
                   .catch( ( error: any ) =>
                           {
                               this.restErrorReporter.reportRestError( error );
                               return Observable.throw( error )
                           })
                   .share();  // if there are multiple subscribers, without this call, the http call will be executed for each observer
    }

    /**
     * Retrieves a specific page of stocks
     * @param rowOffSet The page to retrieve
     * @param rows The numbers of rows per page (rows to return for this page)
     * @returns {Observable<PaginationPage<Stock>>}
     */
    public getPage( modelObject: T, lazyLoadEvent: LazyLoadEvent ): Observable<PaginationPage<T>>
    {
        let methodName = "getPage";
        let url = new PaginationURL( this.getReadModelObjectListUrl( modelObject ) ).getPage( lazyLoadEvent );
        this.logger.log( `${methodName} url: ${url}` );
        return this.http
                   .get( url )
                   .map( ( response: Response ) =>
                         {
                             return response.json();
                         } )
                   .catch( ( error: any ) =>
                           {
                               this.restErrorReporter.reportRestError( error );
                               return Observable.throw( error );
                           } );
    }
}
