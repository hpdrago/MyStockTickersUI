import { Component, Input, OnInit } from '@angular/core';
import { isNullOrUndefined } from "util";
import { StockModelObject } from '../../model/common/stock-model-object';
import { StockPriceQuote } from '../../model/entity/stock-price-quote';
import { BaseComponent } from './base.component';
import { ToastsManager } from 'ng2-toastr';
import { StockPriceQuoteCacheService } from '../../service/cache/stock-price-quote-cache.service';

/**
 * This component displays the percent the price has changed since the model object was created.
 * It compares the StockPriceQuoteModelObject.lastPrice with the StockPriceQuoteModelObject.stockPriceWhenCreated.
 */
@Component(
{
    selector: 'stock-quote-percent-change-since-created',
    template: `<stock-price-quote [tickerSymbol]="stockModelObject.tickerSymbol"
                                  (stockPriceQuoteChange)="onStockPriceQuoteChange( $event )">
                   <gain-loss-percent [percentValue]="calculatePercentChange()"></gain-loss-percent>
               </stock-price-quote>
    `
})
export class StockQuotePercentChangeSinceCreatedComponent extends BaseComponent
    implements OnInit
{
    /**
     * The stock model object from which the ticker symbol is used to register for stock price quote changes.
     */
    @Input()
    protected stockModelObject: StockModelObject<any>;

    /**
     * Set from the {@code StockPriceQuoteComponent}.
     */
    private stockPriceQuote: StockPriceQuote;

    /**
     * Constructor
     * @param {ToastsManager} toaster
     */
    public constructor( protected toaster: ToastsManager,
                        private stockPriceQuoteCache: StockPriceQuoteCacheService )
    {
        super( toaster );
    }

    public ngOnInit(): void
    {
        this.addSubscription( 'stockPriceQuoteCache',
            this.stockPriceQuoteCache
                .subscribe( this.stockModelObject.tickerSymbol,
                            (stockPriceQuote) =>
                            {
                                this.onStockPriceQuoteChange( stockPriceQuote );
                            }));

    }

    /**
     * This method is called when the stock price quote changes for the ticker symbol.
     * @param {StockPriceQuote} stockPriceQuote
     */
    protected onStockPriceQuoteChange( stockPriceQuote: StockPriceQuote )
    {
        this.log( 'onStockPriceQuoteChange ' + JSON.stringify( stockPriceQuote ));
        this.stockPriceQuote = stockPriceQuote;
    }

    /**
     * Determines the percent of change from the original price to the last price.
     * @return A percent of change.
     */
    protected calculatePercentChange(): number
    {
        if ( isNullOrUndefined( this.stockModelObject ) ||
             isNullOrUndefined( this.stockPriceQuote ))
        {
            return 0;
        }
        else
        {
            if ( isNullOrUndefined( this.stockPriceQuote.lastPrice ) ||
                 this.stockPriceQuote.lastPrice == 0 )
            {
                return 0;
            }
            if ( isNullOrUndefined( this.stockModelObject.stockPriceWhenCreated ) ||
                 this.stockModelObject.stockPriceWhenCreated == 0 )
            {
                return 0;
            }
            let percentChanged = 1.0 - ( this.stockModelObject.stockPriceWhenCreated / this.stockPriceQuote.lastPrice );
            return percentChanged;
        }
    }
}
