import { Observable } from "rxjs";
import { Response, Headers, RequestOptions, Http } from "@angular/http";
import { SessionService } from "./session.service";
import { ReadRestService } from "./read-rest.service";
import { ModelObject } from "../../model/entity/modelobject";
import { AppConfigurationService } from "../app-configuration.service";
import { ModelObjectFactory } from "../../model/factory/model-object.factory";

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
                 protected appConfigurationService: AppConfigurationService,
                 protected modelObjectFactory: ModelObjectFactory<T> )
    {
        super( http, sessionService, appConfigurationService, modelObjectFactory );
    }

    /**
     * Returns the URL string to Create a single model object via REST
     * @param modelObject
     */
    protected abstract getCreateModelObjectUrl( baseUrl: string, modelObject: T ): string;

    /**
     * Returns the URL string to Update a single model object via REST
     * @param modelObject
     */
    protected abstract getUpdateModelObjectUrl( baseUrl: string, modelObject: T ): string;

    /**
     * Returns the URL string to delete a single model object via REST
     * @param modelObject
     */
    protected abstract getDeleteModelObjectUrl( baseUrl: string, modelObject: T ): string;

    /**
     * Creates the model object via REST.
     * Override {@code getCreateModelObjectUrl( modelObject )} to get the correct REST URL
     * @param modelObject
     * @returns {Observable<T>}
     */
    public createModelObject( modelObject: T ): Observable<T>
    {
        var methodName = "createModelObject";
        modelObject.createdBy = this.sessionService.getLoggedInUserId();
        var bodyString = JSON.stringify( modelObject ); // Stringify payload
        this.logger.log( methodName + " modelObject: " + bodyString );
        var headers = new Headers( { 'Content-Type': 'application/json' } ); // ... Set content type to JSON
        var options = new RequestOptions( { headers: headers } ); // Create a request option
        var url = this.getCreateModelObjectUrl( this.appConfigurationService.getBaseUrl(), modelObject );
        this.logger.log( methodName + " url: " + url );
        return this.http.post( url, bodyString, options ) // ...using post request
                        .map( ( res: Response ) =>
                        {
                            this.logger.log( methodName + " received: " + JSON.stringify( res.json() ) );
                            return this.modelObjectFactory.newModelObjectFromObject( res.json() );
                        } ) // ...and calling .json() on the response to return data
                        .catch( ( error: any ) => Observable.throw( error || 'Server error' ) ); //...errors if any
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
        this.logger.log( methodName + " modelObject: " + bodyString );
        var headers = new Headers( { 'Content-Type': 'application/json' } ); // ... Set content type to JSON
        var options = new RequestOptions( { headers: headers } ); // Create a request option
        var url =  this.getUpdateModelObjectUrl( this.appConfigurationService.getBaseUrl(), modelObject );
        this.logger.log( methodName + " url: " + url );

        return this.http.put( url, bodyString, options ) // ...using put request
                        .map( ( res: Response ) =>
                        {
                            this.logger.log( methodName + " received: " + JSON.stringify( res.json() ));
                            return this.modelObjectFactory.newModelObjectFromObject( res.json() );
                        } ) // ...and calling .json() on the response to return data
                        .catch( ( error: any ) => Observable.throw( error.json().error || 'Server error' ) ); //...errors if any
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
        this.logger.log( methodName + " modelObject: " + JSON.stringify( modelObject ) );
        var url = this.getDeleteModelObjectUrl( this.appConfigurationService.getBaseUrl(), modelObject );
        this.logger.log( methodName + " url: " + url ) ;
        return this.http.delete( url ) // ...using delete request
                        .map( ( res: Response ) =>
                              {
                                  this.logger.debug( methodName + " res: "+ JSON.stringify( res ));
                                  if ( !res.ok )
                                  {
                                      throw Observable.throw( "Delete was not OK" );
                                  }
                                  return;
                              } ) // ...and calling .json() on the response to return data
                        .catch( ( error: any ) => Observable.throw( error.json().error || 'Server error' ) ); //...errors if any
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

