import { StockQuoteModelObject } from '../../model/entity/stock-quote-modelobject';
import { Component, Input } from '@angular/core';
import { StockQuoteState } from '../../common/stock-quote-state.enum';

/**
 * This component is used for StockQuoteModelObject which contains a stock price -- last price.  The stock quote last
 * price is displayed as "Loading..." if the stock quote is stale or not cached already.  Otherwise, the stock quote
 * last prices is displayed in dollars.
 */
@Component(
{
    selector: 'stock-quote-last-price',
    template: `
        <div *ngIf="isFetchingQuote()">
            Loading...
        </div>
        <div *ngIf="!isFetchingQuote()">
            {{stockQuote.lastPrice | currency: 'USD': true }}
        </div>
    `
})
export class StockQuoteLastPriceComponent
{
    @Input()
    private stockQuote: StockQuoteModelObject<any>;

    private isFetchingQuote(): boolean
    {
        return StockQuoteState.isFetchingQuote( this.stockQuote ) ;
    }
}
