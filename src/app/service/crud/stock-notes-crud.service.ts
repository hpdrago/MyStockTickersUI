import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
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

    /**
     * Override to null the date fields as dates originate from the server and we would have to convert the date to
     * a standard format.
     *
     * @param {StockNotes} modelObject
     * @return {Observable<StockNotes>}
     */
    public createModelObject( modelObject: StockNotes ): Observable<StockNotes>
    {
        modelObject.dateCreated = null;
        modelObject.dateModified = null;
        modelObject.notesDate = null;
        return super.createModelObject( modelObject );
    }

    protected getCreateModelObjectUrl( baseUrl: string, stockNotes: StockNotes ): string
    {
        return baseUrl + `${this.urlPath}/${stockNotes.customerId}`;
    }

    protected getReadModelObjectUrl( baseUrl: string, stockNotes: StockNotes ): string
    {
        return baseUrl + this.urlPath + `/${stockNotes.id}`;
    }

    protected getReadModelObjectListUrl( baseUrl: string, stockNotes: StockNotes ): string
    {
        return undefined;
    }

    protected getUpdateModelObjectUrl( baseUrl: string, stockNotes: StockNotes ): string
    {
        return baseUrl + this.urlPath + `/${stockNotes.id}`;
    }

    protected getDeleteModelObjectUrl( baseUrl: string, stockNotes: StockNotes ): string
    {
        return baseUrl + this.urlPath + `/${stockNotes.id}`;
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
        //stockNote.tickerSymbol = tickerSymbol;
        return super.getModelObjectList( stockNote );
    }


}
