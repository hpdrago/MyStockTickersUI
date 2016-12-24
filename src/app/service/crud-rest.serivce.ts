import { BaseService } from "./base-service";
import { Observable } from "rxjs";
import { Response, Headers, RequestOptions, Http } from "@angular/http";
import { SessionService } from "./session.service";
import { AppConfigurationService } from "./app-configuration.service";
import { ModelObject } from "../model/base-modelobject";

/**
 * Generic Service class for REST CRUD methods
 * @param T Subclass of {@code AbstractModel}
 *
 * <T> - Read Model Type and Search Criteria Type
 *
 * Created by mike on 12/4/2016.
 */
export abstract class CrudRestService<T extends ModelObject<T>> extends BaseService
{
    constructor( protected http: Http,
                 protected sessionService: SessionService,
                 protected appConfigurationService: AppConfigurationService )
    {
        super();
    }

    /**
     * Returns the URL string to Create a single model object via REST
     * @param modelObject
     */
    protected abstract getCreatedModelObjectUrl( baseUrl: string, modelObject: T ): string;

    /**
     * Returns the URL string to Read a single model object via REST
     * @param modelObject
     */
    protected abstract getReadModelObjectUrl( baseUrl: string, modelObject: T ): string;

    /**
     * Returns the URL string to Read a single model object via REST
     * @param modelObject
     */
    protected abstract getReadModelObjectListUrl( baseUrl: string, modelObject: T ): string;

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
     * Retrieves the model object via REST.
     * Override {@code getReadModelObjectUrl( modelObject )} to get the correct REST URL
     * @param modelObject null, or instance of a modelObject that will be passed to the URL generation method to
     *        format an appropriate URL to retrieve the modelObject
     * @returns {Observable<T>}
     */
    public getModelObject( modelObject: T ): Observable<T>
    {
        var methodName = "getModelObject";
        this.logger.log( methodName + " query for: " + JSON.stringify( modelObject ) );
        var url = this.getReadModelObjectUrl( this.appConfigurationService.getBaseUrl(), modelObject );
        this.logger.log( methodName + " url: " + url );
        return this.http.get( url ) // ...using put request
                   .map( ( response: Response ) =>
                         {
                             this.logger.log( methodName + " received: " + response.json() )
                             return response.json();
                         } ) // ...and calling .json() on the response to return data
                   .catch( ( error: any ) => Observable.throw( this.reportError( error )) );
    }

    /**
     * Get the stocks for a portfolio by the portfolio id
     * @param portfolioId
     * @returns {Observable<R>}
     */
    public getModelObjectList( modelObject: T ): Observable<Array<T>>
    {
        var methodName = "getModelObjectList";
        var url: string = this.getReadModelObjectListUrl( this.appConfigurationService.getBaseUrl(), modelObject );
        this.logger.log( methodName + " modelObject: " + JSON.stringify( modelObject ));
        return this.http.get( url )
                   .map( ( response: Response ) =>
                         {
                             this.logger.log( methodName + " received response" );
                             return response.json()
                         } )
                   .catch( ( error: any ) => Observable.throw( this.reportError( error )) );
    }

    /**
     * Creates the model object via REST.
     * Override {@code getCreateModelObjectUrl( modelObject )} to get the correct REST URL
     * @param modelObject
     * @returns {Observable<T>}
     */
    public addCreateModelObject( modelObject: T ): Observable<T>
    {
        var methodName = "addCreateModelObject";
        var bodyString = JSON.stringify( modelObject ); // Stringify payload
        this.logger.log( methodName + " modelObject: " + bodyString );
        var headers = new Headers( { 'Content-Type': 'application/json' } ); // ... Set content type to JSON
        var options = new RequestOptions( { headers: headers } ); // Create a request option
        var url = this.getCreatedModelObjectUrl( this.appConfigurationService.getBaseUrl(), modelObject );
        this.logger.log( methodName + " url: " + url );
        return this.http.post( url, bodyString, options ) // ...using post request
            .map( ( res: Response ) =>
            {
                this.logger.log( methodName + " received: " + res.json() );
                return res.json();
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
        this.logger.log( methodName + " modelObject: " + bodyString );
        var headers = new Headers( { 'Content-Type': 'application/json' } ); // ... Set content type to JSON
        var options = new RequestOptions( { headers: headers } ); // Create a request option
        var url =  this.getUpdateModelObjectUrl( this.appConfigurationService.getBaseUrl(), modelObject );
        this.logger.log( methodName + " url: " + url );

        return this.http.put( url, bodyString, options ) // ...using put request
            .map( ( res: Response ) =>
            {
                this.logger.log( methodName + " received: " + res.json() );
                return res.json();
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
            .map( ( res: Response ) => res.json() ) // ...and calling .json() on the response to return data
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

