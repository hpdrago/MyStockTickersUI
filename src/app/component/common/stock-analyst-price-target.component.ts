import { Component, Input, OnInit } from '@angular/core';
import { StockAnalystConsensusCache } from '../../service/stock-analyst-consensus-cache';
import { StockAnalystConsensusBaseComponent } from './stock-analyst-consensus-base.component';
import { ToastsManager } from 'ng2-toastr';

/**
 * This component displays one of: high, avg, and low stock analyst price consensus.
 */
@Component
({
    selector: 'stock-analyst-price-target',
    template: `<div *ngIf="stockAnalystConsensus != null; then foundTemplate else notFoundTemplate">
               </div>
               <ng-template #foundTemplate>
                   <currency [currencyValue]="analystPriceTarget"></currency> 
               </ng-template>
               <ng-template #notFoundTemplate>
                   <tipranks-link [tickerSymbol]="tickerSymbol"
                                  displayValue="Tip Ranks">
                   </tipranks-link>
               </ng-template>
    `
})
export class StockAnalystPriceTargetComponent extends StockAnalystConsensusBaseComponent
{
    /**
     * Must be 'high', 'avg', 'low'
     */
    @Input()
    private target: string;

    /**
     * The price target based on the value of {@code target}
     */
    protected analystPriceTarget: number;

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

    /**
     * Check the target and set the correct price target.
     */
    public ngOnInit(): void
    {
        super.ngOnInit();
        if ( this.stockAnalystConsensus != null )
        {
            switch( this.target )
            {
                case 'high':
                    this.analystPriceTarget = this.stockAnalystConsensus.highAnalystPriceTarget;
                    break;
                case 'avg':
                    this.analystPriceTarget = this.stockAnalystConsensus.avgAnalystPriceTarget;
                    break;
                case 'low':
                    this.analystPriceTarget = this.stockAnalystConsensus.lowAnalystPriceTarget;
                    break;
                default:
                    throw new ReferenceError( 'target must be high, avg, or low' );
            }
        }
    }
}