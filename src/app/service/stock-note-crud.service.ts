import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StockNotes } from "../model/class/stock-notes";
import { Http } from "@angular/http";
import { SessionService } from "./session.service";
import { AppConfigurationService } from "./app-configuration.service";
import { CrudRestService } from "./crud-rest.serivce";
import { StockNotesFactory } from "../model/factory/stock-notes.factory";
import { StockNoteCountFactory } from "../model/factory/stock-note-count.factory";

/**
 * This class provides all CRUD REST services for Stock Notes.
 *
 * Created by mike on 10/23/2016.
 */
@Injectable()
export class StockNoteCrudService extends CrudRestService<StockNotes>
{
    private urlPath = "/stockNotes/"

    constructor ( protected http: Http,
                  protected sessionService: SessionService,
                  protected appConfigurationService: AppConfigurationService,
                  protected stockNoteFactory: StockNotesFactory,
                  protected stockNoteCountFactory: StockNoteCountFactory )
    {
        super( http, sessionService, appConfigurationService, stockNoteFactory );
    }

    protected getCreateModelObjectUrl( baseUrl: string, stockNote: StockNotes ): string
    {
        return baseUrl + `/${stockNote.customerId}/${stockNote.tickerSymbol}`;
    }

    protected getReadModelObjectUrl( baseUrl: string, stockNote: StockNotes ): string
    {
        return baseUrl + this.urlPath;
    }

    protected getReadModelObjectListUrl( baseUrl: string, stockNote: StockNotes ): string
    {
        return baseUrl + `/${stockNote.customerId}/${stockNote.tickerSymbol}`;
    }

    protected getUpdateModelObjectUrl( baseUrl: string, stockNote: StockNotes ): string
    {
        return baseUrl + this.urlPath;
    }

    protected getDeleteModelObjectUrl( baseUrl: string, stockNote: StockNotes ): string
    {
        return baseUrl + this.urlPath + stockNote.id;
    }

    /**
     * Add a stockNote for a customer
     * @param stockNote
     * @returns {Observable<StockNotes>}
     */
    public addStockNote( stockNote: StockNotes ): Observable<any>
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
    public getStockNotes( customerId: number, tickerSymbol: string ): Observable<Array<StockNotes>>
    {
        let methodName = "getStockNotes";
        this.logger.debug( `${methodName} customerId: ${customerId} tickerSymbol: ${tickerSymbol}`);
        var stockNote: StockNotes = new StockNotes();
        stockNote.customerId = customerId;
        stockNote.tickerSymbol = tickerSymbol;
        return super.getModelObjectList( stockNote );
    }


}
