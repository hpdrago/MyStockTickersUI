import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { SessionService } from "./session.service";
import { AppConfigurationService } from "../app-configuration.service";
import { CrudRestService } from "./crud-rest.serivce";
import { StockNotesCountFactory } from "../../model/factory/stock-note-count.factory";
import { StockNotes } from "../../model/entity/stock-notes";
import { StockNotesFactory } from "../../model/factory/stock-notes.factory";

/**
 * This class provides all CRUD REST services for Stock Notes.
 *
 * Created by mike on 10/23/2016.
 */
@Injectable()
export class StockNotesCrudService extends CrudRestService<StockNotes>
{
    private urlPath = "/stockNotes"

    constructor ( protected http: Http,
                  protected sessionService: SessionService,
                  protected appConfigurationService: AppConfigurationService,
                  protected stockNotesFactory: StockNotesFactory,
                  protected stockNoteCountFactory: StockNotesCountFactory )
    {
        super( http, sessionService, appConfigurationService, stockNotesFactory );
    }

    protected getCreateModelObjectUrl( baseUrl: string, stockNotes: StockNotes ): string
    {
        return baseUrl + `${this.urlPath}`;
    }

    protected getReadModelObjectUrl( baseUrl: string, stockNotes: StockNotes ): string
    {
        return baseUrl + this.urlPath + `/${stockNotes.id}`;
    }

    /**
     * This method is called to load the stock notes tables.
     * @param {string} baseUrl
     * @param {StockNotes} stockNotes Must have the customerId set and optionally the tickerSymbol
     * @returns {string}
     */
    protected getReadModelObjectListUrl( baseUrl: string, stockNotes: StockNotes ): string
    {
        var url: string = baseUrl + `${this.urlPath}/${stockNotes.customerId}`;
        if ( stockNotes.tickerSymbol )
        {
            url += '/' + stockNotes.tickerSymbol;
        }
        return url;
    }

    protected getUpdateModelObjectUrl( baseUrl: string, stockNotes: StockNotes ): string
    {
        return baseUrl + this.urlPath + `/${stockNotes.id}`;
    }

    protected getDeleteModelObjectUrl( baseUrl: string, stockNotes: StockNotes ): string
    {
        return baseUrl + this.urlPath + `/${stockNotes.id}`;
    }

    public getStockNotesForTickerSymbol( tickerSymbol: string )
    {

    }
}
