import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from './base.component';
import { ToastsManager } from 'ng2-toastr';
import { StockPriceCacheService } from '../../service/stock-price-cache.service';
import { StockPriceQuote } from '../../model/entity/stock-price-quote';
import { Subscription } from 'rxjs/Subscription';
import { isNullOrUndefined } from 'util';
import { StockPriceQuoteContainer } from '../../model/common/stock-price-quote-container';
import { StockQuoteContainer } from '../../model/common/stock-quote-container';

/**
 * This component is used for StockPriceQuoteModelObject which contains a stock price -- last price.  The stock quote last
 * price is displayed as "Loading..." if the stock quote is stale or not cached already.  Otherwise, the stock quote
 * last prices is displayed in dollars.
 */
@Component(
{
    selector: 'stock-quote-last-price',
    template: `
        <div *ngIf="isFetchingQuote(); then loading else notLoading">
        </div>
        <ng-template #loading>
            Loading...
        </ng-template>
        <ng-template #notLoading>
            <div *ngIf="stockPriceModelObject != null">
                <div *ngIf="isFetchError()">
                    <i pTooltip="{{stockPriceQuote.cacheError}}">ERROR</i>
                </div>
                <div *ngIf="!isFetchError()">
                    <div class="positiveGain" *ngIf="priceChange >= 0.0">
                        <currency [currencyValue]="stockPriceModelObject.getStockPriceQuote().lastPrice"></currency>
                    </div>
                    <div class="negativeGain" *ngIf="priceChange < 0.0">
                        <currency [currencyValue]="stockPriceModelObject.getStockPriceQuote().lastPrice"></currency>
                    </div>
                </div>
            </div>
        </ng-template>
    `
})
export class StockQuoteLastPriceComponent extends BaseComponent implements OnInit, OnDestroy
{
    /**
     * Reference to the model object for which the price is being displayed.
     */
    @Input()
    protected stockPriceModelObject: StockPriceQuoteContainer & StockQuoteContainer;

    /**
     * The amount of price change from the open to the current/last price.
     * @type {number}
     */
    protected priceChange: number = 0.0;

    /**
     * Subscription to stock price changes.
     */
    private subscription: Subscription;

    /**
     * The stock price value obtained from the cache
     */
    protected stockPriceQuote: StockPriceQuote;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockPriceCacheService} stockPriceCache
     */
    constructor( protected toaster: ToastsManager,
                 private stockPriceCache: StockPriceCacheService,
                 private changeDetector: ChangeDetectorRef )
    {
        super( toaster );
    }

    /**
     * Calculate the difference once.
     */
    public ngOnInit()
    {
        this.debug( "ngOnInit " + JSON.stringify( this.stockPriceModelObject ));
        super.addSubscription( "getStockPriceChanges",
            this.subscription =
                this.stockPriceCache
                    .getStockPriceChanges( this.stockPriceModelObject.getTickerSymbol(),
                                           stockPriceQuote => this.onStockPriceChange( stockPriceQuote )));
    }

    /**
     * This method is called by the StockPriceCache when the stock price changes.
     * The stockModelObject maybe null in the initial registration.
     * @param {StockPriceQuote} stockPriceQuote
     */
    private onStockPriceChange( stockPriceQuote: StockPriceQuote )
    {
        let methodName = 'onStockPriceChange';
        this.log( methodName + ' ' + JSON.stringify( stockPriceQuote ));
        /*
         * Due to change detection errors since this can be called while in ngInit, run it on the next
         * change cycle.
         */
        super.tickThenRun( () =>
        {
            this.stockPriceQuote = stockPriceQuote;
            if ( stockPriceQuote != null )
            {
                if ( stockPriceQuote.cacheError )
                {
                    this.logError( methodName + ' ' + stockPriceQuote.cacheError );
                }
                else
                {
                    this.log( methodName + ' ' + JSON.stringify( stockPriceQuote ));
                    this.stockPriceModelObject
                        .setStockPriceQuote( stockPriceQuote );
                    this.priceChange = this.stockPriceModelObject.getStockPriceQuote().lastPrice -
                        this.stockPriceModelObject.getStockQuote().openPrice;
                }
            }
        });
    }

    /**
     * Determines if the stock last price is being fetched.
     * @return {boolean}
     */
    private isFetchingQuote(): boolean
    {
        return this.stockPriceQuote == null;
    }

    /**
     * Returns true if there is an error fetching a quote, false otherwise.
     * @return {boolean}
     */
    private isFetchError(): boolean
    {
        if ( this.isFetchingQuote() ) return false;
        if ( isNullOrUndefined( this.stockPriceQuote )) return false;
        if ( this.stockPriceQuote.cacheError ) return true;
        return false;
    }
}
