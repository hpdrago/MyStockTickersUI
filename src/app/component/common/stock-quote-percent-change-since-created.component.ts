import { Component, Input } from '@angular/core';
import { StockPriceQuoteModelObject } from '../../model/entity/stock-price-quote-model-object';
import { isNullOrUndefined } from "util";

/**
 * This component displays the percent the price has changed since the model object was created.
 * It compares the StockPriceQuoteModelObject.lastPrice with the StockPriceQuoteModelObject.stockPriceWhenCreated.
 */
@Component(
{
    selector: 'stock-quote-percent-change-since-created',
    template: `<gain-loss-percent [percentValue]="calculatePercentChange(stockPriceQuote)"></gain-loss-percent>`
})
export class StockQuotePercentChangeSinceCreatedComponent
{
    @Input()
    protected stockPriceQuote: StockPriceQuoteModelObject<any>;

    /**
     * Determines the percent of change from the original price to the last price.
     * @return A percent of change.
     */
    protected calculatePercentChange( stockPrice: StockPriceQuoteModelObject<any> ): number
    {
        if ( isNullOrUndefined( stockPrice ))
        {
            return 0;
        }
        else
        {
            if ( stockPrice.lastPrice == null || stockPrice.lastPrice == 0 )
            {
                return 0;
            }
            if ( stockPrice.stockPriceWhenCreated == null || stockPrice.stockPriceWhenCreated == 0 )
            {
                return 0;
            }
            let percentChanged = 1.0 - ( stockPrice.stockPriceWhenCreated / stockPrice.lastPrice );
            return percentChanged;
        }
    }
}
