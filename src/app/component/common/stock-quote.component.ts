import { BaseComponent } from './base.component';
import { ToastsManager } from 'ng2-toastr';
import { StockQuoteCacheService } from '../../service/stock-quote-cache.service';
import { Component, Input, OnInit } from '@angular/core';
import { StockQuote } from '../../model/entity/stock-quote';
import { StockQuoteFactory } from '../../model/factory/stock-quote.factory';

/**
 * This component displays a single property of a {@code StockQuote} model object.
 * It works with the {@code StockQuoteCacheService} to obtain the stock quote property asynchronously if needed.
 */
@Component
({
    selector: 'stock-quote',
    template: `<cached-value [cachedStateContainer]="stockQuote">
                {{stockQuote[property]}}
               </cached-value>
    `
})
export class StockQuoteComponent extends BaseComponent implements OnInit
{
    /**
     * The source of the stock quote data.
     */
    protected stockQuote: StockQuote;

    @Input()
    protected  tickerSymbol: string;

    /**
     * The property to display for the stock quote.
     */
    @Input()
    protected property: string;

    public constructor( protected toaster: ToastsManager,
                        private stockQuoteCache: StockQuoteCacheService,
                        private stockQuoteFactory: StockQuoteFactory )
    {
        super( toaster );
        this.stockQuote = this.stockQuoteFactory.newModelObject();
    }

    /**
     * Initialization.
     */
    public ngOnInit(): void
    {
        this.tickThenRun( () =>
                          {
                              this.stockQuoteCache
                                  .subscribeToChanges( this.tickerSymbol,
                                                      (stockQuote: StockQuote) => this.onReceiveStockQuote( stockQuote ) );
                          })
    }

    /**
     * This method will be called when the stock quote has been retrieved the first time and whenever it changes.
     * @param {StockQuote} stockQuote
     */
    private onReceiveStockQuote( stockQuote: StockQuote )
    {
        let methodName = 'onReceiveStockQuote';
        this.log( methodName + ' ' + JSON.stringify( stockQuote ));
        if ( stockQuote != null )
        {
            this.stockQuote = stockQuote;
        }
    }

}
