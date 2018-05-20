import { Component, Input } from '@angular/core';
import { StockAnalystConsensusCache } from '../../service/cache/stock-analyst-consensus-cache';
import { StockAnalystConsensusBaseComponent } from './stock-analyst-consensus-base.component';
import { StockPriceQuote } from '../../model/entity/stock-price-quote';
import { ToastsManager } from 'ng2-toastr';

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
    @Input()
    private stockPriceQuote: StockPriceQuote;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockAnalystConsensusCache} stockAnalystConsensusCache
     */
    constructor( protected toaster: ToastsManager,
                 protected stockAnalystConsensusCache: StockAnalystConsensusCache )
    {
        super( toaster, stockAnalystConsensusCache );
    }

    public ngOnInit(): void
    {
        this.tickerSymbol = this.stockPriceQuote.tickerSymbol;
        super.ngOnInit();
    }

    /**
     * Calculates the amount of upside potential from current stock price to the average analyst price
     * @param rowData
     * @returns {number}
     */
    protected calcAvgUpsidePercent(): number
    {
        if ( this.stockPriceQuote.lastPrice != null &&
             this.stockAnalystConsensus != null &&
             this.stockAnalystConsensus.avgAnalystPriceTarget != null &&
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
