import { Component, Input } from '@angular/core';
import { StockAnalystConsensusCache } from '../../service/cache/stock-analyst-consensus-cache';
import { StockAnalystConsensusBaseComponent } from '../stock-analyst-consensus/stock-analyst-consensus-base.component';
import { StockPriceQuote } from '../../model/entity/stock-price-quote';
import { ToastsManager } from 'ng2-toastr';
import { StockPriceQuoteContainer } from '../../model/common/stock-price-quote-container';

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
    private stockPriceQuoteContainer: StockPriceQuoteContainer;

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
        this.tickerSymbol = this.stockPriceQuoteContainer.getTickerSymbol();
        super.ngOnInit();
    }

    /**
     * Calculates the amount of upside potential from current stock price to the average analyst price
     * @param rowData
     * @returns {number}
     */
    protected calcAvgUpsidePercent(): number
    {
        if ( this.stockPriceQuoteContainer.getLastPrice() != null &&
             this.stockAnalystConsensus != null &&
             this.stockAnalystConsensus.avgAnalystPriceTarget != null &&
             this.stockAnalystConsensus.avgAnalystPriceTarget > 0.0 )
        {
            if ( this.stockPriceQuoteContainer.getLastPrice() < this.stockAnalystConsensus.avgAnalystPriceTarget )
            {
                return this.stockPriceQuoteContainer.getLastPrice() / this.stockAnalystConsensus.avgAnalystPriceTarget;
            }
            else
            {
                return (this.stockAnalystConsensus.avgAnalystPriceTarget / this.stockPriceQuoteContainer.getLastPrice());
            }
        }
        else
        {
            return 0;
        }
    }
}
