import { Component, Input } from '@angular/core';
import { StockPriceModelObject } from '../../model/entity/stock-price-model-object';
import { StockQuote } from '../../model/entity/stock-quote';
import { isNullOrUndefined } from "util";

/**
 * This component displays the percent the price has changed since the model object was created.
 * It compares the StockPriceModelObject.lastPrice with the StockPriceModelObject.stockPriceWhenCreated.
 */
@Component(
{
    selector: 'stock-quote-percent-change-since-created',
    template: `<gain-loss-percent [percentValue]="calculatePercentChange(stockQuote)"></gain-loss-percent>`
})
export class StockQuotePercentChangeSinceCreatedComponent
{
    @Input()
    protected stockQuote: StockPriceModelObject<any>;

    /**
     * Determines the percent of change from the original price to the last price.
     * @return A percent of change.
     */
    protected calculatePercentChange( stockQuote: StockQuote ): number
    {
        if ( isNullOrUndefined( stockQuote ))
        {
            return 0;
        }
        else
        {
            if ( stockQuote.lastPrice == null || stockQuote.lastPrice == 0 )
            {
                return 0;
            }
            if ( stockQuote.stockPriceWhenCreated == null || stockQuote.stockPriceWhenCreated == 0 )
            {
                return 0;
            }
            let percentChanged = 1.0 - ( stockQuote.stockPriceWhenCreated / stockQuote.lastPrice );
            return percentChanged;
        }
    }
}
