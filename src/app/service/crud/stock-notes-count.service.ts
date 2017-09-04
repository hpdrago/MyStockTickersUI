
import {ReadRestService} from "./read-rest.service";
import {Http} from "@angular/http";
import {SessionService} from "./session.service";
import {AppConfigurationService} from "../app-configuration.service";
import {StockNotesCountFactory} from "../../model/factory/stock-note-count.factory";
import {Observable} from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { StockNoteCount } from "../../model/entity/stock-note-count";

@Injectable()
export class StockNotesCountService extends ReadRestService<StockNoteCount>
{
  private stockNoteCountsUrlPath = "/stockNoteCounts/"

  constructor( protected http: Http,
               protected sessionService: SessionService,
               protected appConfigurationService: AppConfigurationService,
               protected modelObjectFactory: StockNotesCountFactory )
  {
    super( http, sessionService, appConfigurationService, modelObjectFactory );
  }

  /**
   * Returns the URL string to Read a single model object via REST
   * @param modelObject
   */
  protected getReadModelObjectUrl( baseUrl: string, modelObject: StockNoteCount ): string
  {
      return this.stockNoteCountsUrlPath;
  }

  /**
   * Returns the URL string to Read a single model object via REST
   * @param modelObject
   */
  protected getReadModelObjectListUrl( baseUrl: string, modelObject: StockNoteCount ): string
  {
      return this.stockNoteCountsUrlPath;
  }

  public getStockNoteCounts( customerId: number ): Observable<Array<StockNoteCount>>
  {
    let methodName = "getStockNotes";
    this.logger.debug( `${methodName} customerId: ${customerId}`);
    var stockNoteCount: StockNoteCount = this.modelObjectFactory.newModelObject();
    stockNoteCount.customerId = customerId;
    return super.getModelObjectList( stockNoteCount );
  }

}
