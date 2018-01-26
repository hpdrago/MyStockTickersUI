import { CrudRestService } from "./crud-rest.serivce";
import { StockNotesSource } from "../../model/entity/stock-notes-source";
import { SessionService } from "../session.service";
import { Http } from "@angular/http";
import { AppConfigurationService } from "../app-configuration.service";
import { StockNotesSourceFactory } from "../../model/factory/stock-notes-source.factory";
import { Observable } from "rxjs/Observable";
import { StockNotesSourceList } from "../../component/stock-notes/stock-notes-source-list";
import { Injectable } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { RestErrorReporter } from '../rest-error-reporter';

/**
 * This class contains the CRUD services necessary to create, delete, update, and retrieve source of stock notes.
 */
@Injectable()
export class StockNotesSourceCrudService extends CrudRestService<StockNotesSource>
{
    private urlPath = "/stockNotesSource";

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {Http} http
     * @param {SessionService} sessionService
     * @param {AppConfigurationService} appConfig
     * @param {restErrorReporter} restErrorReporter
     * @param {StockNotesSourceFactory} modelObjectFactory
     */
    constructor( protected toaster: ToastsManager,
                 protected http: Http,
                 protected sessionService: SessionService,
                 protected appConfig: AppConfigurationService,
                 protected restErrorReporter: RestErrorReporter,
                 protected modelObjectFactory: StockNotesSourceFactory )
    {
        super( http,
               sessionService,
               appConfig,
               restErrorReporter,
               modelObjectFactory );
    }

    protected getContextBaseURL(): string
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
                                                          this.log( methodName + " received response " + JSON.stringify( stockNotesSourcesArray ) );
                                                          var stockNotesSourceList: StockNotesSourceList = new StockNotesSourceList(
                                                              stockNotesSourcesArray );
                                                          this.log( methodName + " " + JSON.stringify( stockNotesSourceList ));
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
