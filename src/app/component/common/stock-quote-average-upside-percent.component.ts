import { Component, Input } from '@angular/core';
import { StockQuoteModelObject } from '../../model/entity/stock-quote-modelobject';

/**
 * This component compares the current prices of the stock quote (lastPrice) against the average analyst price target
 * and computes the potential upside percentage.
 */
@Component(
{
    selector: 'stock-quote-average-upside-percent',
    template: `{{calcAvgUpsidePercent( stockQuote ) | percent:'1.0-0' }}`
})
export class StockQuoteAverageUpsidePercentComponent
{
    @Input()
    protected stockQuote: StockQuoteModelObject<any>;

    /**
     * Calculates the amount of upside potential from current stock price to the average analyst price
     * @param rowData
     * @returns {number}
     */
    private calcAvgUpsidePercent( stockQuote ): number
    {
        if ( stockQuote.lastPrice != null &&
            stockQuote.avgAnalystPriceTarget != null &&
            stockQuote.avgAnalystPriceTarget > 0.0 )
        {
            if ( stockQuote.lastPrice < stockQuote.avgAnalystPriceTarget )
            {
                return stockQuote.lastPrice / stockQuote.avgAnalystPriceTarget;
            }
            else
            {
                return (stockQuote.avgAnalystPriceTarget / stockQuote.lastPrice);
            }
        }
        else
        {
            return 0;
        }
    }
}
