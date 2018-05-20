import { Component, Input } from '@angular/core';
import { BaseComponent } from './base.component';
import { ToastsManager } from 'ng2-toastr';
import { StockPriceQuoteCacheService } from '../../service/cache/stock-price-quote-cache.service';
import { StockPriceQuoteContainer } from '../../model/common/stock-price-quote-container';
import { StockQuoteContainer } from '../../model/common/stock-quote-container';

/**
 * This component is used for StockPriceQuoteModelObject which contains a stock price -- last price.  The stock quote last
 * price is displayed as "Loading..." if the stock quote is stale or not cached already.  Otherwise, the stock quote
 * last prices is displayed in dollars.
 *
 * <stock-quote> simply loads the stockQuote
 * <stock-price-quote> lodas the stockPriceQuote
 */
@Component(
{
    selector: 'stock-quote-last-price',
    template: `<stock-quote (stockQuoteChange)="stockQuoteContainer.getStockQuote()">
                   <stock-price-quote (stockPriceQuoteChange)="stockPriceQuoteContainer.getStockPriceQuote()">
                       <stock-price-gain-loss [amount]="stockPriceQuoteContainer.getStockPriceQuote().lastPrice"
                                              [changeAmount]="getChangeAmount()">
                       </stock-price-gain-loss>
                   </stock-price-quote>
               </stock-quote>
    `
})
export class StockQuoteLastPriceComponent extends BaseComponent
{
    /**
     * Reference to the object instance containing a {@code StockQuote}.
     */
    @Input()
    protected stockQuoteContainer: StockQuoteContainer;

    /**
     * Reference to the object instance containing a {@code StockPriceQuote}.
     */
    @Input()
    protected stockPriceQuoteContainer: StockPriceQuoteContainer;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockPriceQuoteCacheService} stockPriceCache
     */
    constructor( protected toaster: ToastsManager,
                 private stockPriceCache: StockPriceQuoteCacheService )
    {
        super( toaster );
    }

    protected getChangeAmount(): number
    {
        return this.stockPriceQuoteContainer
                   .getStockPriceQuote()
                    .lastPrice - this.stockQuoteContainer
                                     .getStockQuote()
                                     .openPrice;
    }
}
