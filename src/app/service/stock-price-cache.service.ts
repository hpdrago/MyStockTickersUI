import { BaseService } from "./base-service";
import { Injectable } from "@angular/core";
import { StockPriceQuote } from "../model/entity/stock-price-quote";
import { Observable } from "rxjs/Observable";
import { StockCrudService } from "./crud/stock-crud.service";
import { ToastsManager } from "ng2-toastr";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

/**
 * This class caches stock prices by ticker symbol.
 * The cache contains BehaviourSubject's so that price change updates are automatic for all subscribers.
 */
@Injectable()
export class StockPriceCacheService extends BaseService
{
    /**
     * Contains the current quote values
     * @type {Map<any, any>}
     */
    private stockPriceSubjectMap: Map<string, BehaviorSubject<StockPriceQuote>> = new Map();
    /**
     * Contains the quotes being updated
     * @type {Map<any, any>}
     */
    private workingMap: Map<string, Observable<StockPriceQuote>> = new Map();

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
     * Subscribe to stock price changes for a ticker symbol.  When calling this method, if the stock price is not
     * in the cache, the stockPriceChange method will be called with a null stockPrice value but after the stock price
     * has been received, a subsequent call to stockPriceChange will be called with the new stock price value and
     * whenever the stock price changes, the stockPriceChange method will be called as well.
     * @param {string} tickerSymbol
     * @returns {Observable<StockPriceQuote>}
     */
    public getStockPriceChanges( tickerSymbol: string,
                                 stockPriceChange: ( stockPrice: StockPriceQuote ) => any ): Subscription
    {
        let methodName = "getStockPriceChanges";
        this.debug( methodName + " " + tickerSymbol  );
        /*
         * Check to see if the stock price is in the cache
         */
        let stockPriceSubject = this.stockPriceSubjectMap.get( tickerSymbol );
        if ( stockPriceSubject == null )
        {
            stockPriceSubject = new BehaviorSubject<StockPriceQuote>( null );
            this.debug( methodName + " " + tickerSymbol + " is not in the cache.  Fetching..." );
            this.stockPriceSubjectMap
                .set( tickerSymbol, stockPriceSubject );
            /*
             * Not in the cache, so fetch it and then broadcast the new stock price.
             */
            this.fetchStockPrice( tickerSymbol );
        }
        this.checkStockPriceExpiration( stockPriceSubject, tickerSymbol );
        return stockPriceSubject.subscribe( stockPriceChange );
    }

    /**
     * Check to see if the stock has expired and if so, refresh the price.
     */
    private checkStockPriceExpiration( stockPriceSubject, tickerSymbol: string )
    {
        let methodName = 'checkStockPriceExpiration';
        if ( stockPriceSubject != null &&
             stockPriceSubject.getValue() != null &&
             stockPriceSubject.getValue()
                              .expiration.getTime() < Date.now() )
        {
            this.debug( methodName + ' ' + tickerSymbol + ' has expired, updating price...' );
            this.fetchStockPrice( tickerSymbol );
        }
    }

    /**
     * Fetches the stock quote and updates the cache with the quote.
     * @param {string} tickerSymbol
     * @return {Observable<StockPriceQuote>}
     */
    private fetchStockPrice( tickerSymbol: string )
    {
        let methodName = 'fetchStockPrice';
        let observable = this.stockService
                             .getStockPriceQuote( tickerSymbol )
                             .map( ( stockPrice ) =>
                             {
                                   this.debug( methodName + ' ' + tickerSymbol +
                                       ' price retrieved ' + JSON.stringify( stockPrice ) );
                                   this.sendStockPriceChange( tickerSymbol, stockPrice );
                                   this.workingMap.delete( tickerSymbol );
                                   return stockPrice
                             })
        this.workingMap.set( tickerSymbol, observable );
        return observable;
    }

    /**
     * Send the stock price to all subscribers of the ticker symbol.
     * @param {string} tickerSymbol
     * @param {StockPriceQuote} stockPrice
     */
    private sendStockPriceChange( tickerSymbol: string, stockPrice: StockPriceQuote )
    {
        let methodName = 'sendStockPriceChange';
        this.debug( methodName + ' ' + tickerSymbol + ' ' + stockPrice );
        this.getStockPriceSubject( tickerSymbol )
            .next( stockPrice );
    }

    /**
     * Get the stock price subject and throw and exception if it doesn't exist.
     * @param {string} tickerSymbol
     */
    private getStockPriceSubject( tickerSymbol: string ): BehaviorSubject<StockPriceQuote>
    {
        let stockPriceSubject = this.stockPriceSubjectMap.get( tickerSymbol );
        if ( stockPriceSubject == null )
        {
            throw new Error( "There are no registrations for " + tickerSymbol );
        }
        return stockPriceSubject;
    }
}
