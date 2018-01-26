import { Component, Input, OnInit } from '@angular/core';
import { StockAnalystConsensus } from '../../model/entity/stock-analyst-consensus';
import { StockAnalystConsensusCache } from '../../service/cache/stock-analyst-consensus-cache';

/**
 * This component displays the low, avg, and high analyst price targets.
 */
@Component
({
    selector: 'stock-analyst-price-targets',
    template: `<div *ngIf="stockAnalystConsensus != null; then foundTemplate else notFoundTemplate">
               </div>
               <ng-template #foundTemplate>
                   <currency [currencyValue]="stockAnalystConsensus.lowAnalystPriceTarget"></currency> |
                   <currency [currencyValue]="stockAnalystConsensus.avgAnalystPriceTarget"></currency> |
                   <currency [currencyValue]="stockAnalystConsensus.highAnalystPriceTarget"></currency>  
               </ng-template>
               <ng-template #notFoundTemplate>
               </ng-template>
    `
})
export class StockAnalystPriceTargetsComponent implements OnInit
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
