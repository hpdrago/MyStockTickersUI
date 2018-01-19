import { Observable } from "rxjs";
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { SessionService } from "../session.service";
import { ReadRestService } from "./read-rest.service";
import { ModelObject } from "../../model/entity/modelobject";
import { AppConfigurationService } from "../app-configuration.service";
import { ModelObjectFactory } from "../../model/factory/model-object.factory";
import { isNullOrUndefined } from "util";
import { KeyValuePair } from "../../common/key-value-pair";

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
    constructor( protected http: Http,
                 protected sessionService: SessionService,
                 protected appConfig: AppConfigurationService,
                 protected modelObjectFactory: ModelObjectFactory<T> )
    {
        super( http, sessionService, appConfig, modelObjectFactory );
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
        modelObject.createdBy = this.sessionService.getLoggedInUserId();
        var bodyString = this.serialize( modelObject ); // Stringify payload
        this.log( methodName + " modelObject: " + bodyString );
        if ( isNullOrUndefined( modelObject ) )
        {
            throw new ReferenceError( "modelObject is null or undefined" );
        }
        var headers = new Headers( { 'Content-Type': 'application/json' } ); // ... Set content type to JSON
        var options = new RequestOptions( { headers: headers } ); // Create a request option
        var url = this.getCreateModelObjectUrl();
        if ( isNullOrUndefined( url ) )
        {
            throw new ReferenceError( "url is null or undefined" );
        }
        this.log( methodName + " url: " + url );
        return this.http.post( url, bodyString, options ) // ...using post request
                        .map( ( res: Response ) =>
                        {
                            this.log( methodName + " received: " + JSON.stringify( res.json() ) );
                            var newModelObject: T =  this.modelObjectFactory.newModelObjectFromJSON( res.json() );
                            this.log( methodName + " newModelObject: " + this.serialize( newModelObject ));
                            return newModelObject;
                        } ) // ...and calling .json() on the response to return data
                        .catch( ( error: any ) => Observable.throw( error || 'Server error' ) )//...errors if any
                        .share();  // if there are multiple subscribers, without this call, the http call will be executed for each observer
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
        var headers = new Headers( { 'Content-Type': 'application/json' } ); // ... Set content type to JSON
        var options = new RequestOptions( { headers: headers } ); // Create a request option
        var url =  this.getUpdateModelObjectURL( modelObject );
        this.log( methodName + " url: " + url );
        if ( isNullOrUndefined( url ) )
        {
            throw new ReferenceError( "url is null or undefined" );
        }

        return this.http.put( url, bodyString, options ) // ...using put request
                        .map( ( res: Response ) =>
                        {
                            this.log( methodName + " received: " + JSON.stringify( res.json() ));
                            return this.modelObjectFactory.newModelObjectFromJSON( res.json() );
                        } ) // ...and calling .json() on the response to return data
                        .catch( ( error: any ) => Observable.throw( error.json().error || 'Server error' ) ) //...errors if any
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
        return this.http.delete( url ) // ...using delete request
                        .map( ( res: Response ) =>
                              {
                                  this.debug( methodName + " res: "+ JSON.stringify( res ));
                                  if ( !res.ok )
                                  {
                                      throw Observable.throw( "Delete was not OK" );
                                  }
                                  return;
                              } ) // ...and calling .json() on the response to return data
                        .catch( ( error: any ) => Observable.throw( error.json().error || 'Server error' ) ) //...errors if any
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

