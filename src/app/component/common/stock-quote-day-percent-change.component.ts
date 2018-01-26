import { Component, Input } from '@angular/core';
import { StockPriceQuoteModelObject } from '../../model/common/stock-price-quote-model-object';
import { StockPriceQuote } from '../../model/entity/stock-price-quote';
import { isNullOrUndefined } from "util";

/**
 * This component displays the percent the price has changed since the trading day opened.
 * It compares the StockPriceQuoteModelObject.lastPrice with the StockPriceQuoteModelObject.openPrice.
 */
@Component(
{
    selector: 'stock-quote-day-percent-change',
    template: `<gain-loss-percent [percentValue]="calculatePercentChange(stockPriceQuote)"></gain-loss-percent>`
})
export class StockQuoteDayPercentChangeComponent
{
    @Input()
    protected stockPriceQuote: StockPriceQuoteModelObject<any>;

    /**
     * Determines the percent of change from the original price to the last price.
     * @return A percent of change.
     */
    protected calculatePercentChange( stockPriceQuote: StockPriceQuote ): number
    {
        if ( isNullOrUndefined( stockPriceQuote ))
        {
            return 0;
        }
        else
        {
            if ( stockPriceQuote.lastPrice == null || stockPriceQuote.lastPrice == 0 )
            {
                return 0;
            }
            if ( stockPriceQuote.openPrice == null || stockPriceQuote.openPrice == 0 )
            {
                return 0;
            }
            let percentChanged = 1.0 - ( stockPriceQuote.openPrice / stockPriceQuote.lastPrice );
            return percentChanged;
        }
    }
}
