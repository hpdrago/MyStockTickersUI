import { BaseService } from "./base-service";
import { Injectable } from "@angular/core";
import { StockQuote } from "../model/entity/stock-quote";
import { Observable } from "rxjs/Observable";
import { StockCrudService } from "./crud/stock-crud.service";
import { ToastsManager } from "ng2-toastr";

@Injectable()
export class StockQuoteCache extends BaseService
{
    private quoteMap: Map<string, StockQuote> = new Map();
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
     * @returns {Observable<StockQuote>}
     */
    public getStockQuote( tickerSymbol: string ): Observable<StockQuote>
    {
        let stockQuote: StockQuote = this.quoteMap.get( tickerSymbol );
        if ( stockQuote == null )
        {
            return this.refreshStockQuote( tickerSymbol );
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
    public refreshStockQuote( tickerSymbol: string ): Observable<StockQuote>
    {
        let methodName = "getStockQuote";
        this.debug( methodName + " " + tickerSymbol  );
        if ( this.workingMap.get( tickerSymbol ) == null )
        {
            this.debug( methodName + " " + tickerSymbol + " not in cache" );
            let observable: Observable<StockQuote> = this.stockService
                                                         .getStockQuote( tickerSymbol )
                                                         .map( ( stockQuote ) =>
                                                               {
                                                                   this.debug( methodName + " " + tickerSymbol + " quote retrieved" );
                                                                   this.workingMap.delete( tickerSymbol );
                                                                   this.quoteMap.set( tickerSymbol, stockQuote );
                                                                   return stockQuote
                                                               } )
                                                         .share();
            this.workingMap.set( tickerSymbol, observable );
            return observable;
        }
        else
        {
            this.debug( methodName + " " + tickerSymbol + " is already being fetched" );
            return this.workingMap.get( tickerSymbol );
        }
    }
}
