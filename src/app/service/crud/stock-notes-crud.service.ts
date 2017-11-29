import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { SessionService } from "./session.service";
import { AppConfigurationService } from "../app-configuration.service";
import { StockNotesCountFactory } from "../../model/factory/stock-note-count.factory";
import { StockNotes } from "../../model/entity/stock-notes";
import { StockNotesFactory } from "../../model/factory/stock-notes.factory";
import { CrudRestService } from "./crud-rest.serivce";

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
                  protected appConfig: AppConfigurationService,
                  protected stockNotesFactory: StockNotesFactory,
                  protected stockNoteCountFactory: StockNotesCountFactory )
    {
        super( http, sessionService, appConfig, stockNotesFactory );
    }

    protected getContextURL( stockNotes: StockNotes ): string
    {
        return this.urlPath;
    }

    /**
     * This method is called to load the stock notes tables.
     * @param {string} baseUrl
     * @param {StockNotes} stockNotes Must have the customerId set and optionally the tickerSymbol
     * @returns {string}
     */
    protected getReadModelObjectListUrl( stockNotes: StockNotes ): string
    {
        var url: string = super.getReadModelObjectListUrl( stockNotes );
        if ( stockNotes.tickerSymbol )
        {
            url += '/' + stockNotes.tickerSymbol;
        }
        return url;
    }

}
