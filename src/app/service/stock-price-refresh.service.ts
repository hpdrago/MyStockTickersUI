/**
 * Created by mike on 11/4/2017
 */
import { StockPriceModelObject } from "../model/entity/stock-price-model-object";
import { Observable } from "rxjs/Observable";
import { StockPrice } from "../model/entity/stock-price";
import { Injectable } from "@angular/core";
import { BaseService } from "./base-service";
import { StockPriceCache } from "./stock-price-cache.service";
import { CrudRestErrorReporter } from './crud/crud-rest-error-reporter';
import { RestErrorReporter } from './rest-error-reporter';

/**
 * This service will refresh stock quotes by making REST calls through the {@code StockCrudService}.
 */
@Injectable()
export class StockPriceRefreshService extends BaseService
{
    /**
     * Constructor.
     * @param {StockPriceCache} stockQuoteCache
     * @param {RestErrorReporter} restErrorReporter
     */
    constructor( private stockQuoteCache: StockPriceCache,
                 private restErrorReporter: RestErrorReporter )
    {
        super();
        this.doLogging = false;
    }

    /**
     * Refreshes a stock quote.
     * @param {T} stockPriceModelObject
     * @returns {Observable<StockPrice>}
     */
    public refreshStockPrice<T extends StockPriceModelObject<T>>( stockPriceModelObject: T ): Observable<StockPrice>
    {
        this.debug( "refreshStockPrice" );
        return this.stockQuoteCache.getStockPrice( stockPriceModelObject.tickerSymbol )
                                   .map( (stockPrice: StockPrice) =>
                                   {
                                       /*
                                        * Update the stock quote model object argument and return the results
                                        */
                                       stockPriceModelObject.stockPriceState = stockPrice.stockPriceState;
                                       stockPriceModelObject.lastPrice = stockPrice.lastPrice;
                                       stockPriceModelObject.lastPriceChange = stockPrice.lastPriceChange;
                                       stockPriceModelObject.openPrice = stockPrice.openPrice;
                                       return stockPriceModelObject;
                                   })
                                   .catch( ( error: any ) =>
                                   {
                                       this.restErrorReporter.reportRestError( error );
                                       return Observable.throw( null )
                                   })
    }
}
