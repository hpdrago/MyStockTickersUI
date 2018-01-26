import { SessionService } from '../session.service';
import { AppConfigurationService } from '../app-configuration.service';
import { ModelObjectFactory } from '../../model/factory/model-object.factory';
import { Observable } from 'rxjs/Observable';
import { ModelObject } from '../../model/entity/modelobject';
import { BaseService } from '../base-service';
import { isNullOrUndefined, isNumber } from 'util';
import { PaginationPage } from '../../common/pagination';
import { PaginationURL } from '../../common/pagination-url';
import { KeyValuePairs } from '../../common/key-value-pairs';
import { KeyValuePair } from '../../common/key-value-pair';
import { LazyLoadEvent } from 'primeng/primeng';
import { RestErrorReporter } from '../rest-error-reporter';
import { LoadingStatus } from '../../model/common/loading-status';
import { HttpClient } from '@angular/common/http';

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
    protected constructor( protected http: HttpClient,
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
        let methodName = 'getCreateModelObjectUrl';
        this.debug( methodName + '.begin' );
        let contextURL = this.getContextBaseURL();
        if ( isNullOrUndefined( contextURL ) )
        {
            throw new ReferenceError( methodName +' cannot return a null or undefined value' );
        }
        let customerURL = this.getCustomerURL() == null ? '/' : this.getCustomerURL();
        this.debug( methodName + ' contextURL: ' + contextURL + ' customerURL: ' + customerURL );
        let url = this.getCompleteURL( contextURL, customerURL );
        this.debug( methodName + ' url: ' + url );
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
        let methodName = 'getReadModelObjectURL';
        let contextURL = this.getContextURL( modelObject, false );
        this.debug( methodName + ' ' + JSON.stringify( modelObject ));
        if ( isNullOrUndefined( contextURL ) )
        {
            throw new ReferenceError(methodName + ' cannot return a null or undefined value' );
        }
        let customerURL = this.getCustomerURL() == null ? '/' : this.getCustomerURL();
        this.debug( methodName + ' contextURL: ' + contextURL + ' customerURL: ' + customerURL );
        let url = this.getCompleteURL( contextURL, customerURL );
        this.debug( methodName + ' url: ' + url );
        return url;
    }

    /**
     * Combines the application base url + context url + customer url
     * @param {string} contextURL
     * @param {string} customerURL
     * @param {T} modelObject Used to create specific target URL based on model object properties.
     * @return {string}
     */
    protected getCompleteURL( contextURL: string, customerURL: string )
    {
        let methodName = 'getCompleteURL';
        this.debug( `${methodName} contextURL: ${contextURL} customerURL: ${customerURL}` );
        let url = this.appConfig.getBaseURL() + contextURL + customerURL;
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
     * Same as {@code getContextURLFrom( getContextBaseURL(), modelObject );}
     * @param {T} modelObject
     * @return {string}
     */
    protected getContextURL( modelObject: T, pageable: boolean = false ): string
    {
        let methodName = 'getContextURL';
        this.debug( methodName + ' ' + JSON.stringify( modelObject ));
        let contextURL = this.getContextBaseURL() + (pageable ? "/page" : "" );
        contextURL = this.addContextURLKeyValues( modelObject, contextURL );
        return contextURL;
    }

    /**
     * Adds {@code contextURL} to the base context URL and adds the URL key values to the context URL.
     * This method is provides to additional 'context' to the context url in addition to the key values.
     * @param {string} contextURL
     * @param {T} modelObject
     * @returns {string}
     */
    protected getContextURLFrom( contextURL: string, modelObject: T, pageable: boolean = false ): string
    {
        let methodName = 'getContextURLFrom';
        this.debug( methodName + ' ' + contextURL + ' ' + JSON.stringify( modelObject ) );
        contextURL = this.getContextBaseURL() + (pageable ? "/page" : "" ) + contextURL;
        contextURL = this.addContextURLKeyValues( modelObject, contextURL );
        this.debug( methodName + ' contextURL: ' + contextURL );
        return contextURL;
    }

    /**
     * Adds the key values to the contextURL
     * @param {T} modelObject
     * @param {string} contextURL
     * @return {string} The contentURL passed in plus the key values based on the non-null values in {@code modelObject}
     */
    protected addContextURLKeyValues( modelObject: T, contextURL: string )
    {
        let keyColumnValues: KeyValuePairs<string, any> = this.getContextURLKeyValues( modelObject );
        keyColumnValues.forEach( ( key, value ) => contextURL += '/' + key + '/' + value );
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
        let methodName = 'getContextURLKeyValues';
        this.debug( methodName + ' ' + JSON.stringify( modelObject ));
        let primaryKeyValue: any = null;

        let keyValuePairs: KeyValuePairs<string,any> = new KeyValuePairs<string, any>();
        /*
         * Determine if there is a primary key to add to the URL
         */
        if ( !isNullOrUndefined( modelObject ) )
        {
            this.debug( methodName + ' primaryKeyName: ' + modelObject.getPrimaryKeyName() );
            this.debug( methodName + ' primaryKeyValue: ' + modelObject.getPrimaryKeyValue() );
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
        this.debug( methodName + ' ' + JSON.stringify( keyValuePairs ) );
        return keyValuePairs;
    }

    /**
     * Returns the customer portion of the url
     * @returns {string}
     */
    protected getCustomerURL(): string
    {
        if ( isNullOrUndefined( this.sessionService.getLoggedInUserId() ))
        {
            throw new ReferenceError( "logged in user id is null" );
        }
        return '/customerId/' + this.sessionService.getLoggedInUserId();
    }

    /**
     * Returns the URL string to Read a single model object via REST
     * @param modelObject
     */
    protected getReadModelObjectListUrl( modelObject: T, pageable: boolean = false ): string
    {
        let methodName = 'getReadModelObjectListUrl';
        this.debug( methodName + ' ' + JSON.stringify( modelObject ));
        let customerURL = this.getCustomerURL();
        if ( isNullOrUndefined( customerURL ) )
        {
            throw new ReferenceError( 'getCustomerURL cannot return a null or undefined value' );
        }
        this.debug( methodName + ' customerURL: ' + customerURL );
        let contextURL = this.getContextURL( modelObject, pageable );
        let url: string = '';
        if ( isNullOrUndefined( contextURL ) )
        {
            url = this.appConfig.getBaseURL() + (pageable ? "/page" : "" ) + customerURL
        }
        else
        {
            url = this.appConfig.getBaseURL() + contextURL + customerURL
        }
        this.debug( methodName + ' contextURL: ' + contextURL + ' customerURL: ' + customerURL );
        this.debug( methodName + ' url: ' + url );
        return url;
    }

    /**
     * Serializes the object from a TypeScript object to a JSON object
     * @param {T} modelObject
     * @return {string} JSON
     */
    protected serialize( modelObject: T ): string
    {
        //let json: string = serialize( modelObject );
        let json: string = JSON.stringify( modelObject );
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
        let methodName = 'getModelObject';
        this.debug( methodName + ' query for: ' + JSON.stringify( modelObject ) );
        if ( isNullOrUndefined( modelObject ) )
        {
            throw new ReferenceError( 'modelObject is null or undefined' );
        }
        let url = this.getReadModelObjectURL( modelObject );
        this.debug( methodName + ' url: ' + url );
        if ( isNullOrUndefined( url ) )
        {
            throw new ReferenceError( 'url is null or undefined' );
        }
        return this.httpRequestModelObject( url );
    }

    /**
     * For the specific url, requests a model object.  This method allows subclasses query for model objects
     * entities at an alternate url that is different than that that is used in {@code getModelObject}
     * @param {string} url
     * @return {Observable<T extends ModelObject<T>>}
     */
    protected httpRequestModelObject( url: string ): Observable<T>
    {
        let methodName = 'httpRequestModelObject';
        this.debug( methodName + ' ' + url );
        return this.http
                   .get<T>( url ) // ...using put request
                   .map( ( modelObject: T ) =>
                         {
                             this.debug( methodName + ' received: ' + JSON.stringify( modelObject ))
                             modelObject = this.modelObjectFactory.newModelObjectFromJSON( modelObject );
                             //this.setLoadedStatus( modelObject );
                             return modelObject;
                         } ) // ...and calling .json() on the response to return data
                   .catch( ( error: any ) =>
                           {
                               this.restErrorReporter.reportRestError( error );
                               return Observable.throw( null )
                           } )
                   .shareReplay();  // if there are multiple subscribers, without this call, the http call will be executed for each observer
    }

    /**
     * Get a list of model object by Query By Example(QBE) from {@code modelObject}.
     * @param modelObject
     * @returns {Observable<R>}
     */
    public getModelObjectList( modelObject: T ): Observable<Array<T>>
    {
        let methodName = 'getModelObjectList';
        this.debug( methodName + ' modelObject: ' + this.serialize( modelObject ) );
        if ( isNullOrUndefined( modelObject ) )
        {
            throw new ReferenceError( 'modelObject is null or undefined' );
        }
        let url: string = this.getReadModelObjectListUrl( modelObject );
        this.debug( methodName + ' url: ' + url );
        if ( isNullOrUndefined( url ) )
        {
            throw new ReferenceError( 'url is null or undefined' );
        }
        return this.httpRequestModelObjects( url );
    }

    /**
     * For the specific url, requests a list of model objects.  This method allows subclasses query for other lists of
     * entities at an alternate url that is different than that that is used in {@code getModelObjectList}
     * @param {string} url
     * @return {Observable<Array<T extends ModelObject<T>>>}
     */
    protected httpRequestModelObjects( url: string ): Observable<Array<T>>
    {
        let methodName = 'httpRequestModelObjects';
        this.debug( methodName + '.begin ' + url );
        return this.http
                   .get<Array<T>>( url )
                   .map( ( modelObjects: Array<T> ) =>
                         {
                             this.debug( methodName + ' received response' ); //+ JSON.stringify(response) );
                             modelObjects = this.modelObjectFactory
                                                .newModelObjectArray( modelObjects );
                             //modelObjects.forEach( modelObject => this.setLoadedStatus( modelObject ) );
                             this.debug( methodName + ' ' + modelObjects.length + ' model objects' );
                             //this.debug( methodName + ' ' + JSON.stringify( modelObjects ));
                             return modelObjects;
                         })
                   .catch( ( error: any ) =>
                           {
                               this.restErrorReporter.reportRestError( error );
                               return Observable.throw( null )
                           })
                   .shareReplay();  // if there are multiple subscribers, without this call, the http call will be executed for each observer
    }

    /**
     * Returns an instance of the object that handles altering the URL to add sorting and paging arguments.
     * Subclasses can override this method to provide sort column substitutions.
     * @param {string} url
     * @return {PaginationURL}
     */
    protected getPaginationURL( url: string ): PaginationURL
    {
        return new PaginationURL( url );
    }

    /**
     * Retrieves a specific page of stocks
     * @param rowOffSet The page to retrieve
     * @param rows The numbers of rows per page (rows to return for this page)
     * @returns {Observable<PaginationPage<Stock>>}
     */
    public getPage( modelObject: T, lazyLoadEvent: LazyLoadEvent ): Observable<PaginationPage<T>>
    {
        let methodName = 'getPage';
        let url = this.getPaginationURL( this.getReadModelObjectListUrl( modelObject, true ) ).getPage( lazyLoadEvent );
        this.logger.log( `${methodName} url: ${url}` );
        return this.http
                   .get<PaginationPage<T>>( url )
                   .map( ( page: PaginationPage<T> ) =>
                         {
                             /*
                             json.content
                                 .forEach( (modelObject) => this.setLoadedStatus( modelObject ) );
                                 */
                             return page;
                         } )
                   .catch( ( error: any ) =>
                           {
                               this.restErrorReporter.reportRestError( error );
                               return Observable.throw( null );
                           } )
                   .shareReplay();
    }

    /**
     * Sets the loading time and loading status to the initial loading status.
     * @param {T} modelObject
     */
    protected setLoadingStatus( modelObject: T )
    {
        modelObject.loadedTime = Date.now();
        modelObject.loadingStatus = this.getInitialLoadingStatus();
    }

    /**
     * Set the status to LOADED and set the load time.
     * @param {T} modelObject
     */
    protected setLoadedStatus( modelObject: T )
    {
        modelObject.loadedTime = Date.now();
        modelObject.loadingStatus = LoadingStatus.getName( LoadingStatus.LOADED );
    }

    /**
     * After a model object is loaded from the backend, its loading status is set by the return result of this method.
     * Services that handle model objects that are not completely loaded when fetched, should override this method and
     * set the return value to LOADING to indicate that a subsequent backend request is required to retrieve the rest
     * of the model object information.
     * @return {LoadingStatus}
     */
    protected getInitialLoadingStatus(): string
    {
        return LoadingStatus.getName( LoadingStatus.LOADED );
    }
}
