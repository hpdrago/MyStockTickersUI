import { Component } from '@angular/core';
import { StockAnalystConsensusCache } from '../../service/cache/stock-analyst-consensus-cache';
import { StockAnalystConsensusBaseComponent } from './stock-analyst-consensus-base.component';
import { ToastsManager } from 'ng2-toastr';

/**
 * This component displays the analyst consensus buy hold etc values.
 */
@Component({
    selector: 'stock-analyst-consensus',
    styleUrls: ['../stock-analyst-consensus/stock-analyst-consensus-table.component.css'],
    template: `<div *ngIf="stockAnalystConsensus != null; then foundTemplate else notFoundTemplate">
               </div>
               <ng-template #foundTemplate>
                   <span class="strongBuy">{{stockAnalystConsensus.analystStrongBuyCount}}</span><!--
                   --><span class="buy">{{stockAnalystConsensus.analystBuyCount}}</span><!--
                   --><span class="hold">{{stockAnalystConsensus.analystHoldCount}}</span><!--
                   --><span class="underPerform">{{stockAnalystConsensus.analystUnderPerformCount}}</span><!--
                   --><span class="sell">{{stockAnalystConsensus.analystSellCount}}</span>
               </ng-template>
               <ng-template #notFoundTemplate>
               </ng-template>
              `})
export class StockAnalystConsensusComponent extends StockAnalystConsensusBaseComponent
{
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
}
