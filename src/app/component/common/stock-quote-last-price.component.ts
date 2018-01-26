import { StockQuoteModelObject } from '../../model/entity/stock-quote-modelobject';
import { Component, Input, OnInit } from '@angular/core';
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
            <div class="positiveGain" *ngIf="priceChange >= 0.0">
                <currency [currencyValue]="stockQuote.lastPrice"></currency>
            </div>
            <div class="negativeGain" *ngIf="priceChange < 0.0">
                <currency [currencyValue]="stockQuote.lastPrice"></currency>
            </div>
        </div>
    `
})
export class StockQuoteLastPriceComponent implements OnInit
{
    @Input()
    private stockQuote: StockQuoteModelObject<any>;

    private priceChange: number;

    /**
     * Calculate the difference once.
     */
    public ngOnInit()
    {
        this.priceChange = this.stockQuote.lastPrice - this.stockQuote.openPrice;
    }

    /**
     * Determines if the stock last price is being fetched.
     * @return {boolean}
     */
    private isFetchingQuote(): boolean
    {
        return StockQuoteState.isFetchingQuote( this.stockQuote ) ;
    }
}
