import { Observable } from "rxjs";
import { Response, Headers, RequestOptions, Http } from "@angular/http";
import { SessionService } from "./session.service";
import { ReadRestService } from "./read-rest.service";
import { ModelObject } from "../../model/entity/modelobject";
import { AppConfigurationService } from "../app-configuration.service";
import { ModelObjectFactory } from "../../model/factory/model-object.factory";
import { isNullOrUndefined } from "util";
import { PaginationURL } from "../../common/pagination-url";
import { PaginationPage } from "../../common/pagination";

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
     * Returns the URL string to Create a single model object via REST
     * @param modelObject
     */
    protected getCreateModelObjectUrl( modelObject: T ): string
    {
        return this.getTargetURL( modelObject );
    }

    /**
     * Returns the URL string to Update a single model object via REST
     * @param modelObject
     */
    protected getUpdateModelObjectUrl( modelObject: T ): string
    {
        return this.getCustomerURL() + `/${modelObject.getPrimaryKey()}`;
    }

    /**
     * Returns the URL string to delete a single model object via REST
     * @param modelObject
     */
    protected getDeleteModelObjectUrl( modelObject: T ): string
    {
        return this.getCustomerURL() + `/${modelObject.getPrimaryKey()}`;
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
        var url = this.getCreateModelObjectUrl( modelObject );
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
     * Override {@code getUpdateModelObjectUrl( modelObject )} to get the correct REST URL
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
        var url =  this.getUpdateModelObjectUrl( modelObject );
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
     * Override {@code getUpdateModelObjectUrl( modelObject )} to get the correct REST URL
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
        var url = this.getDeleteModelObjectUrl( modelObject );
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

