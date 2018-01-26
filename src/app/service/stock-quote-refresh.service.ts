/**
 * Created by mike on 11/4/2017
 */
import { StockQuoteModelObject } from "../model/entity/stock-quote-modelobject";
import { Observable } from "rxjs/Observable";
import { StockQuote } from "../model/entity/stock-quote";
import { Injectable } from "@angular/core";
import { BaseService } from "./base-service";
import { StockQuoteCache } from "./stock-quote-cache";

/**
 * This service will refresh stock quotes by making REST calls through the {@code StockCrudService}.
 */
@Injectable()
export class StockQuoteRefreshService extends BaseService
{
    constructor( private stockQuoteCache: StockQuoteCache )
    {
        super();
        this.doLogging = false;
    }

    /**
     * Refreshes a stock quote.
     * @param {T} stockQuoteModelObject
     * @returns {Observable<StockQuote>}
     */
    public refreshStockQuote<T extends StockQuoteModelObject<T>>( stockQuoteModelObject: T ): Observable<StockQuote>
    {
        this.debug( "refreshStockQuote" );
        return this.stockQuoteCache.refreshStockQuote( stockQuoteModelObject.tickerSymbol )
                                   .map( (stockQuote) =>
                                         {
                                             return stockQuote;
                                         });
    }
}
