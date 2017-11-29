import { CrudRestService } from "./crud-rest.serivce";
import { StockNotesSource } from "../../model/entity/stock-notes-source";
import { SessionService } from "./session.service";
import { Http } from "@angular/http";
import { AppConfigurationService } from "../app-configuration.service";
import { StockNotesSourceFactory } from "../../model/factory/stock-notes-source.factory";
import { Observable } from "rxjs/Observable";
import { StockNotesSourceList } from "../../component/stocknotes/stock-notes-source-list";
import { Injectable } from "@angular/core";

/**
 * This class contains the CRUD services necessary to create, delete, update, and retrieve source of stock notes.
 */
@Injectable()
export class StockNotesSourceService extends CrudRestService<StockNotesSource>
{
    private urlPath = "/stockNotesSource";

    constructor( protected http: Http,
                 protected sessionService: SessionService,
                 protected appConfig: AppConfigurationService,
                 protected modelObjectFactory: StockNotesSourceFactory )
    {
        super( http, sessionService, appConfig, modelObjectFactory );
    }

    protected getContextURL( stockNotes: StockNotesSource ): string
    {
        return this.urlPath;
    }

    /**
     * Get all of the sources for the customer
     * @param {number} customerId
     * @return {Observable<Array<StockNotesSource>>}
     */
    public getStockNoteSources( customerId: number ): Observable<StockNotesSourceList>
    {
        var methodName: string = "getStockNoteSources";
        this.log( `${methodName} customerId: ${customerId}` );
        var modelObject: StockNotesSource = new StockNotesSource();
        modelObject.customerId = customerId;
        /*
         * A little complicated, but wanted to see how to retrieve an array of StockNotesSource instances and convert
         * it to a Object of StockNotesSourceList.
         */
        return Observable.create( observer =>
                                  {
                                      super.getModelObjectList( modelObject )
                                           .subscribe( stockNotesSourcesArray =>
                                                      {
                                                          this.log( methodName + " received response" );
                                                          var stockNotesSourceList: StockNotesSourceList = new StockNotesSourceList(
                                                              stockNotesSourcesArray );
                                                          observer.next( stockNotesSourceList );
                                                          observer.complete();
                                                      },
                                                       /*
                                                        * Catch exceptions and report error back to observer
                                                        */
                                                      error =>
                                                      {
                                                          this.log( methodName + " received error" );
                                                          observer.error( error );
                                                      });
                                  });
    }
}
