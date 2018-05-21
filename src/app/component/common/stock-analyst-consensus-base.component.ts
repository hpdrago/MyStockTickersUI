import { Input, OnInit } from '@angular/core';
import { StockAnalystConsensus } from '../../model/entity/stock-analyst-consensus';
import { StockAnalystConsensusCache } from '../../service/cache/stock-analyst-consensus-cache';
import { BaseComponent } from './base.component';
import { ToastsManager } from 'ng2-toastr';

/**
 * Base class for components that get their information from the StockAnalystConsensusCache.
 */
export class StockAnalystConsensusBaseComponent extends BaseComponent implements OnInit
{
    @Input()
    protected tickerSymbol: string;

    protected stockAnalystConsensus: StockAnalystConsensus;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockAnalystConsensusCache} stockAnalystConsensusCache
     */
    constructor( protected toaster: ToastsManager,
                 protected stockAnalystConsensusCache: StockAnalystConsensusCache )
    {
        super( toaster );
    }

    /**
     * Get the stockAnalystConsensus instance.
     */
    public ngOnInit(): void
    {
        this.debug( 'tickerSymbol: ' + this.tickerSymbol );
        if ( this.tickerSymbol == null )
        {
            throw new Error( 'tickerSymbol cannot be null' );
        }
        this.stockAnalystConsensus = this.stockAnalystConsensusCache
                                         .get( this.tickerSymbol );
    }
}
