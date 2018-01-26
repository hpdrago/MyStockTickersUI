import { BaseService } from "./base-service";
import { Injectable } from "@angular/core";
import { StockPrice } from "../model/entity/stock-price";
import { Observable } from "rxjs/Observable";
import { StockCrudService } from "./crud/stock-crud.service";
import { ToastsManager } from "ng2-toastr";

/**
 * This class caches stock quotes by ticker symbol
 */
@Injectable()
export class StockPriceCache extends BaseService
{
    /**
     * Contains the current quote values
     * @type {Map<any, any>}
     */
    private stockPriceMap: Map<string, StockPrice> = new Map();
    /**
     * Contains the quotes being updated
     * @type {Map<any, any>}
     */
    private workingMap: Map<string, Observable<StockPrice>> = new Map();

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockCrudService} stockService
     */
    constructor( protected toaster: ToastsManager,
                 private stockService: StockCrudService )
    {
        super( toaster );
        this.doLogging = false;
    }

    /**
     * This method will get a new stock price for {@code tickerSymbol}.
     * Multiple requests to this method for the same ticker symbol will not result in subsequent quote requests but
     * the multiple request will be serviced by a single stock quote query.
     * @param {string} tickerSymbol
     * @returns {Observable<StockPrice>}
     */
    public getStockPrice( tickerSymbol: string ): Observable<StockPrice>
    {
        let methodName = "refreshStockPrice";
        this.debug( methodName + " " + tickerSymbol  );
        /*
         * Check to see if the stock price is already being fetched
         */
        let observable: Observable<StockPrice> = this.workingMap.get( tickerSymbol );
        if ( observable != null )
        {
            this.debug( methodName + " " + tickerSymbol + " is already being fetched" );
            return this.workingMap.get( tickerSymbol );
        }
        else
        {
            this.debug( methodName + " " + tickerSymbol + " not being fetched" );
            /*
             * Check to see if the stock price is in the cache
             */
            let stockPrice = this.stockPriceMap.get( tickerSymbol );
            if ( stockPrice == null )
            {
                /*
                 * Not in the cache, so fetch it.
                 */
                observable = this.fetchStockPrice( tickerSymbol );
            }
            else
            {
                /*
                 * Check to see if the stock has expired and if so, refresh the quote.
                 */
                if ( stockPrice.expiration.getTime() < Date.now() )
                {
                    this.debug( methodName + " " + stockPrice.tickerSymbol + " has expired, refreshing quote" );
                    observable = this.fetchStockPrice( tickerSymbol );
                }
                else
                {
                    observable = Observable.of( stockPrice );
                }
            }
        }
        return observable;
    }

    /**
     * Fetches the stock quote and updates the cache with the quote.
     * @param {string} tickerSymbol
     * @return {Observable<StockPrice>}
     */
    private fetchStockPrice( tickerSymbol: string ): Observable<StockPrice>
    {
        let methodName = 'fetchStockPrice';
        let observable: Observable<StockPrice> = this.stockService
                                                     .getStockPrice( tickerSymbol )
                                                     .map( ( stockPrice ) =>
                                                           {
                                                               this.debug( methodName + " " + tickerSymbol + " price retrieved " + JSON.stringify( stockPrice ) );
                                                               this.stockPriceMap.set( tickerSymbol, stockPrice );
                                                               this.workingMap.delete( tickerSymbol );
                                                               return stockPrice
                                                           } )
                                                     .share();
        this.workingMap.set( tickerSymbol, observable );
        return observable;
    }
}
