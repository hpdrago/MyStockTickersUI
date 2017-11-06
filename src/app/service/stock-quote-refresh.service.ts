/**
 * Created by mike on 11/4/2017
 */
import { StockQuoteModelObject } from "../model/entity/stock-quote-modelobject";
import { Observable } from "rxjs/Observable";
import { StockCrudService } from "./crud/stock-crud.service";
import { StockQuote } from "../model/entity/stock-quote";
import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";
import { BaseService } from "./base-service";

/**
 * This service will refresh stock quotes by making REST calls through the {@code StockCrudService}.
 */
@Injectable()
export class StockQuoteRefreshService extends BaseService
{
    constructor( private stockService: StockCrudService )
    {
        super();
    }

    /**
     * Refreshes a stock quote.
     * @param {T} stockQuoteModelObject
     * @returns {Observable<StockQuote>}
     */
    public refreshStockQuote<T extends StockQuoteModelObject<T>>( stockQuoteModelObject: T ): Observable<StockQuote>
    {
        this.debug( "refreshStockQuote" );
        let stockQuoteSubject: Subject<StockQuote> = new Subject();
        this.stockService.getStockQuote( stockQuoteModelObject.tickerSymbol )
                         .subscribe( (stockQuote) =>
                                   {
                                       stockQuoteSubject.next( stockQuote );
                                   },
                                   error =>
                                   {
                                       stockQuoteSubject.error( "failed to get a stock quote for " + stockQuoteModelObject.tickerSymbol );
                                   });

        return stockQuoteSubject.asObservable();
    }
}
