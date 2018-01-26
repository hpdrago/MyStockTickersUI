import { Component, Input } from '@angular/core';
import { StockPriceQuote } from '../../model/entity/stock-price-quote';
import { isNullOrUndefined } from "util";
import { StockModelObject } from '../../model/common/stock-model-object';
import { StockQuote } from '../../model/entity/stock-quote';

/**
 * This component displays the percent the price has changed since the trading day opened.
 * It compares the StockPriceQuoteModelObject.lastPrice with the StockPriceQuoteModelObject.openPrice.
 */
@Component(
{
    selector: 'stock-quote-day-percent-change',
    template: `
        <gain-loss-percent [percentValue]="calculatePercentChange(stockModelObject)"></gain-loss-percent>`
})
export class StockQuoteDayPercentChangeComponent
{
    @Input()
    protected stockModelObject: StockModelObject<any>;

    /**
     * Determines the percent of change from the original price to the last price.
     * @return A percent of change.
     */
    protected calculatePercentChange( stockPriceQuote: StockPriceQuote, stockQuote: StockQuote ): number
    {
        if ( isNullOrUndefined( stockQuote ))
        {
            return 0;
        }
        else
        {
            if ( stockPriceQuote.lastPrice == null || stockPriceQuote.lastPrice == 0 )
            {
                return 0;
            }
            if ( stockQuote.openPrice == null || stockQuote.openPrice == 0 )
            {
                return 0;
            }
            let percentChanged = 1.0 - ( stockQuote.openPrice / stockPriceQuote.lastPrice );
            return percentChanged;
        }
    }
}
