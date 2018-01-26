import { Component } from '@angular/core';
import { StockAnalystConsensusCache } from '../../service/cache/stock-analyst-consensus-cache';
import { StockAnalystConsensusBaseComponent } from '../stock-analyst-consensus/stock-analyst-consensus-base.component';
import { StockPriceQuote } from '../../model/entity/stock-price-quote';
import { ToastsManager } from 'ng2-toastr';
import { isNullOrUndefined } from 'util';
import { StockPriceQuoteCacheService } from '../../service/cache/stock-price-quote-cache.service';

/**
 * This component compares the current prices of the stock quote (lastPrice) against the average analyst price target
 * and computes the potential upside percentage.
 */
@Component(
{
    selector: 'stock-average-upside-percent',
    template: `{{calcAvgUpsidePercent() | percent:'1.0-0' }}`
})
export class StockAverageUpsidePercentComponent extends StockAnalystConsensusBaseComponent
{
    private stockPriceQuote: StockPriceQuote;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockAnalystConsensusCache} stockAnalystConsensusCache
     * @param {StockPriceQuoteCacheService} stockPriceQuoteCache
     */
    constructor( protected toaster: ToastsManager,
                 protected stockAnalystConsensusCache: StockAnalystConsensusCache,
                 private stockPriceQuoteCache: StockPriceQuoteCacheService )
    {
        super( toaster, stockAnalystConsensusCache );
    }

    /**
     * Initialize.
     */
    public ngOnInit(): void
    {
        super.ngOnInit();
        this.stockPriceQuoteCache
            .subscribe( this.tickerSymbol, ( stockPriceQuote: StockPriceQuote) =>
            {
                this.onStockPriceQuoteChange( stockPriceQuote );
            });
    }

    /**
     * This method is called when a stock price quote is fetched for the first time or changes.
     * @param {StockPriceQuote} stockPriceQuote
     */
    private onStockPriceQuoteChange( stockPriceQuote: StockPriceQuote )
    {
        const methodName = 'onStockPriceQuoteChange';
        this.log( methodName + ' ' + JSON.stringify( stockPriceQuote ));
        this.stockPriceQuote = stockPriceQuote;
    }

    /**
     * Calculates the amount of upside potential from current stock price to the average analyst price
     * @param rowData
     * @returns {number}
     */
    protected calcAvgUpsidePercent(): number
    {
        if ( !isNullOrUndefined( this.stockPriceQuote ) &&
             !isNullOrUndefined( this.stockPriceQuote.lastPrice ) &&
             !isNullOrUndefined( this.stockAnalystConsensus ) &&
             !isNullOrUndefined( this.stockAnalystConsensus.avgAnalystPriceTarget ) &&
             this.stockAnalystConsensus.avgAnalystPriceTarget > 0.0 )
        {
            if ( this.stockPriceQuote.lastPrice < this.stockAnalystConsensus.avgAnalystPriceTarget )
            {
                return this.stockPriceQuote.lastPrice / this.stockAnalystConsensus.avgAnalystPriceTarget;
            }
            else
            {
                return (this.stockAnalystConsensus.avgAnalystPriceTarget / this.stockPriceQuote.lastPrice);
            }
        }
        else
        {
            return 0;
        }
    }
}
