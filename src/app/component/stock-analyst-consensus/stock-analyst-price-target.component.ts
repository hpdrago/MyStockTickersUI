import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { StockAnalystConsensusCache } from '../../service/cache/stock-analyst-consensus-cache';
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
                   <div style="text-align: right">
                       <currency [currencyValue]="analystPriceTarget"></currency> 
                   </div>
               </ng-template>
               <ng-template #notFoundTemplate>
                   <div style="text-align: right">
                       <yahoo-analysis-link [tickerSymbol]="tickerSymbol"
                                            [displayValue="Go to Yahoo">
                       </yahoo-analysis-link>
                   </div>
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
     * The price target based on the modelObjectRows of {@code target}
     */
    protected analystPriceTarget: number;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockAnalystConsensusCache} stockAnalystConsensusCache
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected toaster: ToastsManager,
                 protected stockAnalystConsensusCache: StockAnalystConsensusCache )
    {
        super( changeDetector, toaster, stockAnalystConsensusCache );
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
