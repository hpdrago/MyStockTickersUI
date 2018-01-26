import { Component, Input, OnInit } from '@angular/core';
import { StockAnalystConsensus } from '../../model/entity/stock-analyst-consensus';
import { StockAnalystConsensusCache } from '../../service/stock-analyst-consensus-cache';

@Component
({
    selector: 'stock-price-targets',
    template: `<div *ngIf="stockAnalystConsensus != null; then foundTemplate else notFoundTemplate">
               </div>
               <ng-template #foundTemplate>
                   <currency [currencyValue]="stockAnalystConsensus.highAnalystPriceTarget"></currency> | 
                   <currency [currencyValue]="stockAnalystConsensus.avgAnalystPriceTarget"></currency> |
                   <currency [currencyValue]="stockAnalystConsensus.lowAnalystPriceTarget"></currency> 
               </ng-template>
               <ng-template #notFoundTemplate>
               </ng-template>
    `
})
export class StockPriceTargetsComponent implements OnInit
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
