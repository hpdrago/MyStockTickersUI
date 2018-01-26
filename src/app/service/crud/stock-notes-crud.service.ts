import { Injectable } from "@angular/core";
import { SessionService } from "../session.service";
import { AppConfigurationService } from "../app-configuration.service";
import { StockNotesCountFactory } from "../../model/factory/stock-note-count.factory";
import { StockNotes } from "../../model/entity/stock-notes";
import { StockNotesFactory } from "../../model/factory/stock-notes.factory";
import { KeyValuePairs } from "../../common/key-value-pairs";
import { RestErrorReporter } from '../rest-error-reporter';
import { isNullOrUndefined } from 'util';
import { HttpClient } from '@angular/common/http';
import { BaseStockService } from './base-stock.service';
import { StockQuoteCacheService } from '../cache/stock-quote-cache.service';
import { StockPriceQuoteCacheService } from '../cache/stock-price-quote-cache.service';
import { StockQuoteFactory } from '../../model/factory/stock-quote.factory';
import { StockPriceQuoteFactory } from '../../model/factory/stock-price-quote.factory';

/**
 * This class provides all CRUD REST services for StockCompany Notes.
 *
 * Created by mike on 10/23/2016.
 */
@Injectable()
export class StockNotesCrudService extends BaseStockService<StockNotes>
{
    private urlPath = "/stockNotes"

    /**
     * Constructor.
     * @param {HttpClient} http
     * @param {SessionService} sessionService
     * @param {AppConfigurationService} appConfig
     * @param {RestErrorReporter} restErrorReporter
     * @param {StockNotesFactory} stockNotesFactory
     * @param {StockNotesCountFactory} stockNoteCountFactory
     * @param {StockQuoteCacheService} stockQuoteCache
     * @param {StockPriceQuoteCacheService} stockPriceQuoteCache
     * @param {StockQuoteFactory} stockQuoteFactory
     * @param {StockPriceQuoteFactory} stockPriceQuoteFactory
     */
    constructor ( protected http: HttpClient,
                  protected sessionService: SessionService,
                  protected appConfig: AppConfigurationService,
                  protected restErrorReporter: RestErrorReporter,
                  protected stockNotesFactory: StockNotesFactory,
                  protected stockNoteCountFactory: StockNotesCountFactory,
                  protected stockQuoteCache: StockQuoteCacheService,
                  protected stockPriceQuoteCache: StockPriceQuoteCacheService,
                  protected stockQuoteFactory: StockQuoteFactory,
                  protected stockPriceQuoteFactory: StockPriceQuoteFactory )
    {
        super( http,
               sessionService,
               appConfig,
               restErrorReporter,
               stockNotesFactory,
               stockQuoteCache,
               stockPriceQuoteCache,
               stockQuoteFactory,
               stockPriceQuoteFactory );
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
