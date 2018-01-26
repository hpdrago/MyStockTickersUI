import { BaseComponent } from './base.component';
import { ToastsManager } from 'ng2-toastr';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StockPriceQuote } from '../../model/entity/stock-price-quote';
import { StockPriceQuoteCacheService } from '../../service/cache/stock-price-quote-cache.service';
import { StockPriceQuoteFactory } from '../../model/factory/stock-price-quote.factory';

/**
 * This component displays a single property of a {@code StockPriceQuote} model object.
 * It works with the {@code StockPriceQuoteCacheService} to obtain the stock priceQuote property asynchronously if needed.
 */
@Component
({
    selector: 'stock-price-quote',
    template: `<cached-value [cachedStateContainer]="stockPriceQuote" 
                             staleMessage="Loading...">
                    <ng-content></ng-content>
               </cached-value>
    `
})
export class StockPriceQuoteComponent extends BaseComponent implements OnInit
{
    /**
     * The source of the stock priceQuote data.
     */
    protected stockPriceQuote: StockPriceQuote;

    /**
     * Set the output of this emitter to the stockPriceQuote property of the model object.  It will get updated after the
     * stock priceQuote is retrieved and whenever it is changes.
     * @type {EventEmitter<StockPriceQuote>}
     */
    @Output()
    private stockPriceQuoteChange: EventEmitter<StockPriceQuote> = new EventEmitter<StockPriceQuote>();

    /**
     * Ticker symbol to identify the stock priceQuote to obtain.
     */
    @Input()
    protected  tickerSymbol: string;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockPriceQuoteCacheService} stockPriceQuoteCache
     * @param {StockPriceQuoteFactory} stockPriceQuoteFactory
     */
    public constructor( protected toaster: ToastsManager,
                        private stockPriceQuoteCache: StockPriceQuoteCacheService,
                        private stockPriceQuoteFactory: StockPriceQuoteFactory )
    {
        super( toaster );
        this.stockPriceQuote = this.stockPriceQuoteFactory.newModelObject();
    }

    /**
     * Initialization.
     */
    public ngOnInit(): void
    {
        this.tickThenRun( () =>
                          {
                              this.stockPriceQuoteCache
                                  .subscribeToChanges( this.tickerSymbol,
                                                      (stockPriceQuote: StockPriceQuote) =>
                                                          this.onReceiveStockPriceQuote( stockPriceQuote ) );
                          })
    }

    /**
     * This method will be called when the stock priceQuote has been retrieved the first time and whenever it changes.
     * @param {StockPriceQuote} stockPriceQuote
     */
    private onReceiveStockPriceQuote( stockPriceQuote: StockPriceQuote )
    {
        let methodName = 'onReceiveStockPriceQuote';
        this.log( methodName + ' ' + JSON.stringify( stockPriceQuote ));
        if ( stockPriceQuote != null )
        {
            this.stockPriceQuote = stockPriceQuote;
            this.stockPriceQuoteChange.emit( stockPriceQuote );
        }
    }
}
