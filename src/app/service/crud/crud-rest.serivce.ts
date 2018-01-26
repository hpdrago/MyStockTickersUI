import { Observable } from "rxjs";
import { SessionService } from "../session.service";
import { ReadRestService } from "./read-rest.service";
import { ModelObject } from "../../model/common/model-object";
import { AppConfigurationService } from "../app-configuration.service";
import { ModelObjectFactory } from "../../model/factory/model-object.factory";
import { isNullOrUndefined } from "util";
import { KeyValuePair } from "../../common/key-value-pair";
import { RestErrorReporter } from '../rest-error-reporter';
import { HttpClient } from '@angular/common/http';

/**
 * Generic Service class for REST CRUD methods
 * @param T Subclass of {@code AbstractModel}
 *
 * <T> - Read Model Type and Search Criteria Type
 *
 * Created by mike on 12/4/2016.
 */
export abstract class CrudRestService<T extends ModelObject<T>> extends ReadRestService<T>
{
    /**
     * Constructor.
     * @param {Http} http
     * @param {SessionService} sessionService
     * @param {AppConfigurationService} appConfig
     * @param {ModelObjectFactory<T extends ModelObject<T>>} modelObjectFactory
     * @param {RestErrorReporter} restErrorReporter
     */
    constructor( protected http: HttpClient,
                 protected sessionService: SessionService,
                 protected appConfig: AppConfigurationService,
                 protected restErrorReporter: RestErrorReporter,
                 protected modelObjectFactory: ModelObjectFactory<T> )
    {
        super( http,
               sessionService,
               appConfig,
               restErrorReporter,
               modelObjectFactory );
    }

    /**
     * Returns the URL for an update or a delete where the URL targets a specific model object instance.
     * @param {T} modelObject
     * @returns {string}
     */
    protected getUpdateOrDeleteURL( modelObject: T ): string
    {
        var methodName = "getUpdateOrDeleteURL";
        this.debug( methodName + " " + JSON.stringify( modelObject ));
        var contextURL = this.getContextBaseURL();
        if ( isNullOrUndefined( contextURL ) )
        {
            throw new ReferenceError( "getContextURL cannot return a null or undefined value" );
        }
        var primaryKey: KeyValuePair<string,any> = this.getContextPrimaryURLKeyValue( modelObject );
        contextURL += "/" + primaryKey.key + "/" + primaryKey.value;
        var customerURL = this.getCustomerURL() == null ? "/" : this.getCustomerURL();
        this.debug( methodName + " contextURL: " + contextURL + " customerURL: " + customerURL );
        var url = this.appConfig.getBaseURL() + contextURL + customerURL;
        this.debug( methodName + " url: " + url );
        return url;
    }

    /**
     * Returns the URL string to Update a single model object via REST
     * @param modelObject
     */
    protected getUpdateModelObjectURL( modelObject: T ): string
    {
        return this.getUpdateOrDeleteURL( modelObject );
    }

    /**
     * Returns the URL string to delete a single model object via REST
     * @param modelObject
     */
    protected getDeleteModelObjectURL( modelObject: T ): string
    {
        return this.getUpdateOrDeleteURL( modelObject );
    }

    /**
     * Creates the model object via REST.
     * Override {@code getCreateModelObjectUrl( modelObject )} to get the correct REST URL
     * @param modelObject
     * @returns {Observable<T>} The new instance of the model object returned from the server after inserted into the
     * database which will include any updated information including identity column values.
     */
    public createModelObject( modelObject: T ): Observable<T>
    {
        var methodName = "createModelObject";
        this.log( methodName + " modelObject: " + JSON.stringify( modelObject ));
        if ( isNullOrUndefined( modelObject ) )
        {
            throw new ReferenceError( "modelObject is null or undefined" );
        }
        modelObject.createdBy = this.sessionService.getLoggedInUserId();
        var url = this.getCreateModelObjectUrl();
        if ( isNullOrUndefined( url ) )
        {
            throw new ReferenceError( "url is null or undefined" );
        }
        this.log( methodName + " url: " + url );
        return this.http.post<T>( url, modelObject )
                        .map( ( modelObject: T ) =>
                        {
                            this.log( methodName + " received: " + JSON.stringify( modelObject ) );
                            var newModelObject: T =  this.modelObjectFactory.newModelObjectFromJSON( modelObject );
                            this.log( methodName + " newModelObject: " + this.serialize( newModelObject ));
                            return newModelObject;
                        })
                        .catch( ( error: any ) =>
                        {
                            this.restErrorReporter.reportRestError( error );
                            return Observable.throw( null )
                        })
                        .shareReplay();  // if there are multiple subscribers, without this call, the http call will be executed for each observer
    }

    /**
     * Updates the model object via REST.
     * Override {@code getUpdateModelObjectURL( modelObject )} to get the correct REST URL
     * @param modelObject
     * @returns {Observable<T>}
     */
    public updateModelObject( modelObject: T ): Observable<T>
    {
        var methodName = "updateModelObject";
        var bodyString = JSON.stringify( modelObject ); // Stringify payload
        modelObject.updatedBy = this.sessionService.getLoggedInUserId();
        this.log( methodName + " modelObject: " + bodyString );
        if ( isNullOrUndefined( modelObject ) )
        {
            throw new ReferenceError( "modelObject is null or undefined" );
        }
        var url =  this.getUpdateModelObjectURL( modelObject );
        this.log( methodName + " url: " + url );
        if ( isNullOrUndefined( url ) )
        {
            throw new ReferenceError( "url is null or undefined" );
        }
        return this.http.put<T>( url, modelObject ) // ...using put request
                        .map( ( updatedModelObject: T ) =>
                        {
                            this.log( methodName + " received: " + JSON.stringify( updatedModelObject ));
                            return this.modelObjectFactory.newModelObjectFromJSON( updatedModelObject );
                        })
                        .catch( ( error: any ) =>
                        {
                            this.restErrorReporter.reportRestError( error );
                            return Observable.throw( null );
                        } )
                        .share();  // if there are multiple subscribers, without this call, the http call will be executed for each observer
    }

    /**
     * Updates the model object via REST.
     * Override {@code getUpdateModelObjectURL( modelObject )} to get the correct REST URL
     * @param modelObject
     * @returns {Observable<Response>}
     */
    public deleteModelObject( modelObject: T ): Observable<void>
    {
        var methodName = "deleteModelObject";
        this.log( methodName + " modelObject: " + JSON.stringify( modelObject ) );
        if ( isNullOrUndefined( modelObject ) )
        {
            throw new ReferenceError( "modelObject is null or undefined" );
        }
        var url = this.getDeleteModelObjectURL( modelObject );
        this.log( methodName + " url: " + url ) ;
        if ( isNullOrUndefined( url ) )
        {
            throw new ReferenceError( "url is null or undefined" );
        }
        return this.http.delete<T>( url ) // ...using delete request
                        .map( ( modelObject: T ) =>
                        {
                            this.debug( methodName + " res: "+ JSON.stringify( modelObject ));
                            return;
                        } ) // ...and calling .json() on the response to return data
                        .catch( ( error: any ) =>
                        {
                            this.restErrorReporter.reportRestError( error );
                            return Observable.throw( null );
                        }) //...errors if any
                        .share();  // if there are multiple subscribers, without this call, the http call will be executed for each observer
    }

    /**
     * Determines if the model object is read only (cannot be changed).
     * @param modelObject
     * @return {boolean} Defaults to return false, must override to implement specific logic
     */
    public isModelObjectReadOnly( modelObject: T ): boolean
    {
        return false;
    }
}

