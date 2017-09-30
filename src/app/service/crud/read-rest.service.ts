import { SessionService } from "./session.service";
import { AppConfigurationService } from "../app-configuration.service";
import { ModelObjectFactory } from "../../model/factory/model-object.factory";
import { Observable } from "rxjs/Observable";
import { Http, Response } from "@angular/http";
import { ModelObject } from "../../model/entity/modelobject";
import { BaseService } from "../base-service";
import { isNullOrUndefined } from "util";

/**
 * Generic class for reading model objects from the database.  Provides a method to read a single entity or a list
 * of entities all of which are of type <T> which extends ModelObject<T>.
 */
export abstract class ReadRestService<T extends ModelObject<T>>
    extends BaseService
{
    constructor( protected http: Http,
                 protected sessionService: SessionService,
                 protected appConfigurationService: AppConfigurationService,
                 protected modelObjectFactory: ModelObjectFactory<T> )
    {
        super();
    }

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
        this.log( methodName + " query for: " + this.serialize( modelObject ) );
        if ( isNullOrUndefined( modelObject ) )
        {
            throw new ReferenceError( "modelObject is null or undefined" );
        }
        var url = this.getReadModelObjectUrl( this.appConfigurationService.getBaseUrl(), modelObject );
        this.log( methodName + " url: " + url );
        if ( isNullOrUndefined( url ) )
        {
            throw new ReferenceError( "url is null or undefined" );
        }
        return this.http
                   .get( url ) // ...using put request
                   .map( ( response: Response ) =>
                   {
                       this.log( methodName + " received: " + response.json() )
                       return this.modelObjectFactory.newModelObjectFromObject( response.json() );
                   } ) // ...and calling .json() on the response to return data
                   .catch( ( error: any ) => Observable.throw( this.reportError( error ) ) );
    }

    /**
     * Get the stocks for a portfolio by the portfolio id
     * @param portfolioId
     * @returns {Observable<R>}
     */
    public getModelObjectList( modelObject: T ): Observable<Array<T>>
    {
        var methodName = "getModelObjectList";
        this.log( methodName + " modelObject: " + this.serialize( modelObject ) );
        if ( isNullOrUndefined( modelObject ) )
        {
            throw new ReferenceError( "modelObject is null or undefined" );
        }
        var url: string = this.getReadModelObjectListUrl( this.appConfigurationService.getBaseUrl(), modelObject );
        this.log( methodName + " url: " + url );
        if ( isNullOrUndefined( url ) )
        {
            throw new ReferenceError( "url is null or undefined" );
        }
        return this.http
                   .get( url )
                   .map( ( response: Response ) =>
                   {
                       this.log( methodName + " received response" );
                       return this.modelObjectFactory.newModelObjectArray( response.json() )
                   })
                   .catch( ( error: any ) => Observable.throw( this.reportError( error ) ) );
    }
}
