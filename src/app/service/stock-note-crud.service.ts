import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StockNote } from "../model/class/stock-note";
import { Http } from "@angular/http";
import { SessionService } from "./session.service";
import { AppConfigurationService } from "./app-configuration.service";
import { CrudRestService } from "./crud-rest.serivce";
import { StockNoteFactory } from "../model/factory/stock-note.factory";
import { StockNoteCountFactory } from "../model/factory/stock-note-count.factory";

/**
 * This class provides all CRUD REST services for Stock Notes.
 *
 * Created by mike on 10/23/2016.
 */
@Injectable()
export class StockNoteCrudService extends CrudRestService<StockNote>
{
    private urlPath = "/stockNotes/"

    constructor ( protected http: Http,
                  protected sessionService: SessionService,
                  protected appConfigurationService: AppConfigurationService,
                  protected stockNoteFactory: StockNoteFactory,
                  protected stockNoteCountFactory: StockNoteCountFactory )
    {
        super( http, sessionService, appConfigurationService, stockNoteFactory );
    }

    protected getCreateModelObjectUrl( baseUrl: string, stockNote: StockNote ): string
    {
        return baseUrl + `/${stockNote.customerId}/${stockNote.tickerSymbol}`;
    }

    protected getReadModelObjectUrl( baseUrl: string, stockNote: StockNote ): string
    {
        return baseUrl + this.urlPath;
    }

    protected getReadModelObjectListUrl( baseUrl: string, stockNote: StockNote ): string
    {
        return baseUrl + `/${stockNote.customerId}/${stockNote.tickerSymbol}`;
    }

    protected getUpdateModelObjectUrl( baseUrl: string, stockNote: StockNote ): string
    {
        return baseUrl + this.urlPath;
    }

    protected getDeleteModelObjectUrl( baseUrl: string, stockNote: StockNote ): string
    {
        return baseUrl + this.urlPath + stockNote.id;
    }

    /**
     * Add a stockNote for a customer
     * @param stockNote
     * @returns {Observable<StockNote>}
     */
    public addStockNote( stockNote: StockNote ): Observable<any>
    {
        let methodName = "addStockNote";
        this.logger.debug( `${methodName} stockNote: ${stockNote}`);
        return super.createModelObject( stockNote );
    }

    /**
     * Get a list of the stockNotes for the customer by customer id
     * @param customerId
     * @param tickerSymbol
     * @returns {Observable<R>}
     */
    public getStockNotes( customerId: number, tickerSymbol: string ): Observable<Array<StockNote>>
    {
        let methodName = "getStockNotes";
        this.logger.debug( `${methodName} customerId: ${customerId} tickerSymbol: ${tickerSymbol}`);
        var stockNote: StockNote = new StockNote();
        stockNote.customerId = customerId;
        stockNote.tickerSymbol = tickerSymbol;
        return super.getModelObjectList( stockNote );
    }


}
