import { Component, Input } from '@angular/core';
import { StockQuoteModelObject } from '../../model/entity/stock-quote-modelobject';
import { StockQuote } from '../../model/entity/stock-quote';
import { isNullOrUndefined } from "util";

/**
 * This component displays the amount the price has changed since the model object was created.
 * It compares the StockQuoteModelObject.lastPrice with the StockQuoteModelObject.stockPriceWhenCreated.
 */
@Component(
{
    selector: 'stock-quote-change-since-created',
    template: `<div class="positiveGain" *ngIf="calculatePercentChange( stockQuote ) >= 0.0">
                  {{calculatePercentChange( stockQuote ) | percent: '1.2-2' }}
               </div>
               <div class="negativeGain" *ngIf="calculatePercentChange( stockQuote ) < 0.0">
                  {{calculatePercentChange( stockQuote ) | percent: '1.2-2' }}
               </div>`
})
export class StockQuoteChangeSinceCreatedComponent
{
    @Input()
    private stockQuote: StockQuoteModelObject<any>;

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
