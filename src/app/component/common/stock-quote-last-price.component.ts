import { StockPriceQuoteModelObject } from '../../model/entity/stock-price-quote-model-object';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from './base.component';
import { ToastsManager } from 'ng2-toastr';
import { StockPriceCacheService } from '../../service/stock-price-cache.service';
import { StockPriceQuote } from '../../model/entity/stock-price-quote';
import { Subscription } from 'rxjs/Subscription';

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
                <div class="positiveGain" *ngIf="priceChange >= 0.0">
                    <currency [currencyValue]="stockPriceModelObject.lastPrice"></currency>
                </div>
                <div class="negativeGain" *ngIf="priceChange < 0.0">
                    <currency [currencyValue]="stockPriceModelObject.lastPrice"></currency>
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
    protected stockPriceModelObject: StockPriceQuoteModelObject<any>;
    /**
     * The amount of price change from the open to the current/last price.
     * @type {number}
     */
    protected priceChange: number = 0.0;
    /**
     * The stock price value obtained from the cache.
     */
    private stockPrice: StockPriceQuote;
    /**
     * Subscription to stock price changes.
     */
    private subscription: Subscription;

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

    /*
    public ngAfterViewInit()
    {
        this.changeDetector.detectChanges();
    }
    */

    /**
     * Calculate the difference once.
     */
    public ngOnInit()
    {
        this.debug( "ngOnInit " + JSON.stringify( this.stockPriceModelObject ));
        super.addSubscription( "getStockPriceChanges",
            this.subscription =
                this.stockPriceCache
                    .getStockPriceChanges( this.stockPriceModelObject.tickerSymbol,
                                           stockPrice => this.stockPriceChange( stockPrice )));
    }

    /**
     * This method is called by the StockPriceCache when the stock price changes.
     * The stockPrice maybe null in the initial registration.
     * @param {StockPriceQuote} stockPrice
     */
    private stockPriceChange( stockPrice: StockPriceQuote )
    {
        super.tickThenRun( () =>
        {
            this.stockPrice = stockPrice;
            if ( stockPrice != null )
            {
                this.stockPriceModelObject
                    .lastPrice = stockPrice.lastPrice;
                this.stockPriceModelObject
                    .openPrice = stockPrice.openPrice;
                this.priceChange = this.stockPriceModelObject.lastPrice -
                                   this.stockPriceModelObject.openPrice;
            }
        });
    }

    /**
     * Determines if the stock last price is being fetched.
     * @return {boolean}
     */
    private isFetchingQuote(): boolean
    {
        return this.stockPrice == null;
    }
}
