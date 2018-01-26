import { Injectable } from "@angular/core";
import { StockPriceQuote } from "../model/entity/stock-price-quote";
import { Observable } from "rxjs/Observable";
import { StockPriceQuoteService } from "./crud/stock-price-quote.service";
import { ToastsManager } from "ng2-toastr";
import { AsyncCacheService } from './common/async-cache.service';
import { StockPriceQuoteFactory } from '../model/factory/stock-price-quote.factory';

/**
 * This class caches stock prices by ticker symbol.
 * The cache contains BehaviourSubject's so that price change updates are automatic for all subscribers.
 */
@Injectable()
export class StockPriceQuoteCacheService extends AsyncCacheService<string,StockPriceQuote>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockPriceQuoteService} stockService
     * @param {StockPriceQuoteFactory} stockPriceQuoteFactory
     */
    constructor( protected toaster: ToastsManager,
                 private stockService: StockPriceQuoteService,
                 private stockPriceQuoteFactory: StockPriceQuoteFactory )
    {
        super( toaster, stockPriceQuoteFactory );
    }

    /**
     * Fetch the stock quote.
     * @param {string} tickerSymbol
     * @return {Observable<StockPriceQuote>}
     */
    protected fetchCachedDataFromBackend( tickerSymbol: string ): Observable<StockPriceQuote>
    {
        return this.stockService
                   .getStockPriceQuote( tickerSymbol )
    }
}
