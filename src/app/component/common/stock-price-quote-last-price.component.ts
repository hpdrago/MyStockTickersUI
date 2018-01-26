import { Component, Input } from '@angular/core';
import { BaseComponent } from './base.component';
import { ToastsManager } from 'ng2-toastr';
import { StockPriceQuoteCacheService } from '../../service/cache/stock-price-quote-cache.service';
import { StockPriceQuoteContainer } from '../../model/common/stock-price-quote-container';
import { StockQuoteContainer } from '../../model/common/stock-quote-container';
import { isNullOrUndefined } from 'util';
import { StockPriceQuote } from '../../model/entity/stock-price-quote';
import { StockQuote } from '../../model/entity/stock-quote';

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
    selector: 'stock-price-quote-last-price',
    template: `<stock-quote [tickerSymbol]="tickerSymbol" 
                            (stockQuoteChange)="onStockQuoteChange( $event )">
                   <stock-price-quote [tickerSymbol]="tickerSymbol" 
                                      (stockPriceQuoteChange)="onStockPriceQuoteChange( $event )">
                       <div *ngIf="isValidData(); then isValidDataTemplate else noValidDataTemplate">
                       </div>
                       
                       <ng-template #noValidDataTemplate>
                            No SPQ {{stockPriceQuote}} {{stockQuote}}
                       </ng-template>
                       
                       <ng-template #isValidDataTemplate>
                           <stock-price-gain-loss [amount]="stockPriceQuote.lastPrice"
                                                  [changeAmount]="getChangeAmount()">
                           </stock-price-gain-loss>
                       </ng-template>
                   </stock-price-quote>
               </stock-quote>
    `
})
export class StockPriceQuoteLastPriceComponent extends BaseComponent
{
    @Input()
    protected tickerSymbol: string;

    /**
     * Reference to the object instance containing a {@code StockQuote}.
     */
    protected stockQuote: StockQuote;

    /**
     * Reference to the object instance containing a {@code StockPriceQuote}.
     */
    protected stockPriceQuote: StockPriceQuote;

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

    /**
     * This method is called when the stock price quote changes.
     * @param {StockPriceQuote} stockPriceQuote
     */
    protected onStockPriceQuoteChange( stockPriceQuote: StockPriceQuote )
    {
        this.log( 'onStockPriceQuoteChange ' + JSON.stringify( stockPriceQuote ));
        this.stockPriceQuote = stockPriceQuote;
    }

    /**
     * This method is called when the stock quote changes.
     * @param {StockQuote} stockQuote
     */
    protected onStockQuoteChange( stockQuote: StockQuote )
    {
        this.log( 'onStockQuoteChange ' + JSON.stringify( stockQuote ));
        this.stockQuote = stockQuote;
    }

    /**
     * Detrmines if the valid data has been received for the StockQuote and StockPriceQuote.
     * @return {boolean}
     */
    protected isValidData(): boolean
    {
        return !isNullOrUndefined( this.stockPriceQuote ) &&
               !isNullOrUndefined( this.stockQuote ) &&
               !isNullOrUndefined( this.stockPriceQuote.lastPrice ) &&
               !isNullOrUndefined( this.stockQuote.openPrice );
    }

    /**
     * Calculate the change amount.
     * @return {number}
     */
    protected getChangeAmount(): number
    {
        if ( this.isValidData() )
        {
            let lastPrice: number = this.stockPriceQuote
                                        .lastPrice;
            let openPrice: number = this.stockQuote
                                        .openPrice;
            return lastPrice - (isNullOrUndefined( openPrice )
                                ? lastPrice
                                : openPrice);
        }
        else
        {
            return 0;
        }
    }
}