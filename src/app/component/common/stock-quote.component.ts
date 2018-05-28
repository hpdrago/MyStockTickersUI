import { BaseComponent } from './base.component';
import { ToastsManager } from 'ng2-toastr';
import { StockQuoteCacheService } from '../../service/cache/stock-quote-cache.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StockQuote } from '../../model/entity/stock-quote';
import { StockQuoteFactory } from '../../model/factory/stock-quote.factory';

/**
 * This component will obtain a {@code StockQuote} form the {@code StockQuoteCacheService}.  This is not a display
 * component but rather a component that fetches stock quote information and displaying a 'Loading' message while
 * the stock quote is retrieved asynchronously.
 *
 * This component is used as a wrapper around another component that requires stock quote information.  The event emmitter
 * will emit the fetch data value and passes it back to the caller in order to save that information to be displayed on a page.
 */
@Component
({
    selector: 'stock-quote',
    template: `<cached-value [cachedStateContainer]="stockQuote">
                    <ng-content></ng-content>
               </cached-value>
    `
})
export class StockQuoteComponent extends BaseComponent implements OnInit
{
    /**
     * The source of the stock quote data.
     */
    protected stockQuote: StockQuote;

    /**
     * Set the output of this emitter to the stockQuote property of the model object.  It will get updated after the
     * stock quote is retrieved and whenever it is changes.
     * @type {EventEmitter<StockQuote>}
     */
    @Output()
    private stockQuoteChange: EventEmitter<StockQuote> = new EventEmitter<StockQuote>();

    /**
     * Ticker symbol to identify the stock quote to obtain.
     */
    @Input()
    protected tickerSymbol: string;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockQuoteCacheService} stockQuoteCache
     * @param {StockQuoteFactory} stockQuoteFactory
     */
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
                              super.addSubscription( 'stockQuoteCache',
                                  this.stockQuoteCache
                                      .subscribeToChanges( this.tickerSymbol,
                                                          (stockQuote: StockQuote) => this.onReceiveStockQuote( stockQuote ) ));
                          })
    }

    /**
     * This method will be called when the stock quote has been retrieved the first time and whenever it changes.
     * @param {StockQuote} stockQuote
     */
    private onReceiveStockQuote( stockQuote: StockQuote )
    {
        const methodName = 'onReceiveStockQuote';
        this.log( methodName + ' ' + JSON.stringify( stockQuote ));
        if ( stockQuote != null )
        {
            this.stockQuote = stockQuote;
            this.stockQuoteChange.emit( stockQuote );
        }
    }

}
