import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { SessionService } from "../session.service";
import { AppConfigurationService } from "../app-configuration.service";
import { StockNotesCountFactory } from "../../model/factory/stock-note-count.factory";
import { StockNotes } from "../../model/entity/stock-notes";
import { StockNotesFactory } from "../../model/factory/stock-notes.factory";
import { CrudRestService } from "./crud-rest.serivce";
import { KeyValuePairs } from "../../common/key-value-pairs";
import { RestErrorReporter } from '../rest-error-reporter';
import { isNullOrUndefined } from 'util';
import { HttpClient } from '@angular/common/http';

/**
 * This class provides all CRUD REST services for StockCompany Notes.
 *
 * Created by mike on 10/23/2016.
 */
@Injectable()
export class StockNotesCrudService extends CrudRestService<StockNotes>
{
    private urlPath = "/stockNotes"

    /**
     * Constructor.
     * @param {Http} http
     * @param {SessionService} sessionService
     * @param {AppConfigurationService} appConfig
     * @param {restErrorReporter} restErrorReporter
     * @param {StockNotesFactory} stockNotesFactory
     * @param {StockNotesCountFactory} stockNoteCountFactory
     */
    constructor ( protected http: HttpClient,
                  protected sessionService: SessionService,
                  protected appConfig: AppConfigurationService,
                  protected restErrorReporter: RestErrorReporter,
                  protected stockNotesFactory: StockNotesFactory,
                  protected stockNoteCountFactory: StockNotesCountFactory )
    {
        super( http,
               sessionService,
               appConfig,
               restErrorReporter,
               stockNotesFactory );
    }

    protected getContextBaseURL(): string
    {
        return this.urlPath;
    }

    /**
     * Check for the ticker symbol being set.
     * @param {StockNotes} stockNotes
     * @returns {string}
     */
    protected getContextURLKeyValues( stockNotes: StockNotes ): KeyValuePairs<string,any>
    {
        let keyColumns = super.getContextURLKeyValues( stockNotes );
        /*
         * Add the ticker symbol only if that's set and the id is not.
         */
        if ( !isNullOrUndefined( stockNotes ) &&
             (isNullOrUndefined( stockNotes.id ) || stockNotes.id.length == 0)&&
             !isNullOrUndefined( stockNotes.tickerSymbol ))
        {
            keyColumns.addPair( "tickerSymbol", stockNotes.tickerSymbol );
        }
        return keyColumns;
    }

}
