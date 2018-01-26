import { BaseService } from "./base-service";
import { Injectable } from "@angular/core";
import { StockQuote } from "../model/entity/stock-quote";
import { Observable } from "rxjs/Observable";
import { StockCrudService } from "./crud/stock-crud.service";
import { ToastsManager } from "ng2-toastr";

/**
 * This class caches stock quotes by ticker symbol
 */
@Injectable()
export class StockQuoteCache extends BaseService
{
    /**
     * Contains the current quote values
     * @type {Map<any, any>}
     */
    private quoteMap: Map<string, StockQuote> = new Map();
    /**
     * Contains the quotes being updated
     * @type {Map<any, any>}
     */
    private workingMap: Map<string, Observable<StockQuote>> = new Map();

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
     * Returns the stock quote from the cache if present, otherwise a new stock quote request is made to obtain the
     * stock quote.
     * @param {string} tickerSymbol
     * @param {boolean} refresh - when true, a fresh stock quote will be retrieved and the cache will be updated.
     *                          - when false, the current value from the cache will be retrieved.
     * @returns {Observable<StockQuote>}
     */
    public getStockQuote( tickerSymbol: string, refresh?: boolean ): Observable<StockQuote>
    {
        let stockQuote: StockQuote = this.quoteMap.get( tickerSymbol );
        if ( stockQuote == null )
        {
            return this.refreshStockQuote( tickerSymbol, refresh );
        }
        else
        {
            return Observable.of( stockQuote );
        }
    }

    /**
     * This method will get a new stock quote for {@code tickerSymbol}.
     * Multiple requests to this method for the same ticker symbol will not result in subsequent quote requests but
     * the multiple request will be serviced by a single stock quote query.
     * @param {string} tickerSymbol
     * @returns {Observable<StockQuote>}
     */
    public refreshStockQuote( tickerSymbol: string, forceRefresh?: boolean ): Observable<StockQuote>
    {
        let methodName = "getStockQuote";
        this.debug( methodName + " " + tickerSymbol  );
        if ( this.workingMap.get( tickerSymbol ) == null || forceRefresh )
        {
            this.debug( methodName + " " + tickerSymbol + " not in cache" );
            let observable = this.fetchStockQuote( tickerSymbol );
            return observable;
        }
        else
        {
            this.debug( methodName + " " + tickerSymbol + " is already being fetched" );
            return this.workingMap.get( tickerSymbol );
            /*
             * Check to see if the stock has expired and if so, refresh the quote.
             */
            //let stockQuote = this.quoteMap.get( tickerSymbol );
            /*
            if ( stockQuote == null )
            {
                if ( stockQuote.expiration.getTime() < Date.now() )
                {
                    this.debug( methodName + " " + stockQuote.tickerSymbol + " has expired, refreshing quote" ) ;
                    return this.fetchStockQuote( tickerSymbol );
                }
                else
                {
                    return this.workingMap
                               .get( tickerSymbol )
                }
                */
        }
    }

    /**
     * Fetches the stock quote and updates the cache with the quote.
     * @param {string} tickerSymbol
     * @return {Observable<StockQuote>}
     */
    private fetchStockQuote( tickerSymbol: string ): Observable<StockQuote>
    {
        let observable: Observable<StockQuote> = this.stockService
                                                     .getStockQuote( tickerSymbol )
                                                     .map( ( stockQuote ) =>
                                                           {
                                                               //this.debug( methodName + " " + tickerSymbol + " quote retrieved " + JSON.stringify( stockQuote ) );
                                                               this.workingMap.delete( tickerSymbol );
                                                               this.quoteMap.set( tickerSymbol, stockQuote );
                                                               return stockQuote
                                                           } )
                                                     .share();
        this.workingMap.set( tickerSymbol, observable );
        return observable;
    }
}
