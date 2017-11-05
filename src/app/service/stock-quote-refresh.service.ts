/**
 * Created by mike on 11/4/2017
 */
import { StockQuoteModelObject } from "../model/entity/stock-quote-modelobject";
import { Observable } from "rxjs/Observable";
import { StockCrudService } from "./crud/stock-crud.service";
import { StockQuote } from "../model/entity/stock-quote";
import { Subject } from "rxjs/Subject";

export class StockQuoteRefreshService
{
    constructor( private stockService: StockCrudService )
    {
    }

    public refreshStockQuote<T extends StockQuoteModelObject<T>>( stockQuoteModelObject: T ): Observable<StockQuote>
    {
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
