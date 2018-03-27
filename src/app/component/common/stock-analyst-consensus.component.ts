import { Component, Input, OnInit } from '@angular/core';
import { StockAnalystConsensus } from '../../model/entity/stock-analyst-consensus';
import { StockAnalystConsensusCache } from '../../service/stock-analyst-consensus-cache';

/**
 * This component displays the analyst consensus buy hold etc values.
 */
@Component({
    selector: 'stock-analyst-consensus',
    styleUrls: ['../stock-analyst-consensus/stock-analyst-consensus-table.component.css'],
    template: `<div *ngIf="stockAnalystConsensus != null; then foundTemplate else foundTemplate">
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
export class StockAnalystConsensusComponent implements OnInit
{
    @Input()
    private tickerSymbol: string;
    protected stockAnalystConsensus: StockAnalystConsensus;

    constructor( private stockAnalystConsensusCache: StockAnalystConsensusCache )
    {
    }

    public ngOnInit(): void
    {
        this.stockAnalystConsensus = this.stockAnalystConsensusCache
                                         .get( this.tickerSymbol );
    }
}
