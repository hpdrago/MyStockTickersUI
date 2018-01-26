import { Component, Input } from '@angular/core';
import { isNullOrUndefined } from "util";
import { StockModelObject } from '../../model/common/stock-model-object';

/**
 * This component displays the percent the price has changed since the model object was created.
 * It compares the StockPriceQuoteModelObject.lastPrice with the StockPriceQuoteModelObject.stockPriceWhenCreated.
 */
@Component(
{
    selector: 'stock-quote-percent-change-since-created',
    template: `
        <gain-loss-percent [percentValue]="calculatePercentChange(stockModelObject)"></gain-loss-percent>`
})
export class StockQuotePercentChangeSinceCreatedComponent
{
    @Input()
    protected stockModelObject: StockModelObject<any>;

    /**
     * Determines the percent of change from the original price to the last price.
     * @return A percent of change.
     */
    protected calculatePercentChange( stockModelObject: StockModelObject<any> ): number
    {
        if ( isNullOrUndefined( stockModelObject ))
        {
            return 0;
        }
        else
        {
            if ( stockModelObject.stockPriceQuote.lastPrice == null || stockModelObject.stockPriceQuote.lastPrice == 0 )
            {
                return 0;
            }
            if ( stockModelObject.stockPriceWhenCreated == null || stockModelObject.stockPriceWhenCreated == 0 )
            {
                return 0;
            }
            let percentChanged = 1.0 - ( stockModelObject.stockPriceWhenCreated / stockModelObject.stockPriceQuote.lastPrice );
            return percentChanged;
        }
    }
}
