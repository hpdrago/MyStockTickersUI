import { Component, Input } from '@angular/core';
import { StockAnalystConsensus } from '../../model/entity/stock-analyst-consensus';

/**
 * This component displays the analyst consensus buy hold etc values.
 */
@Component({
    selector: 'stock-analyst-consensus',
    styleUrls: ['../stock-analyst-consensus/stock-analyst-consensus-table.component.css'],
    template: `<span class="strongBuy">       {{stockAnalystConsensus['analystStrongBuyCount']}}</span><!--
               --><span class="buy">          {{stockAnalystConsensus['analystBuyCount']}}</span><!--
               --><span class="hold">         {{stockAnalystConsensus['analystHoldCount']}}</span><!--
               --><span class="underPerform"> {{stockAnalystConsensus['analystUnderPerformCount']}}</span><!--
               --><span class="sell">         {{stockAnalystConsensus['analystSellCount']}}</span>`
           })
export class StockAnalystConsensusComponent
{
    @Input()
    protected stockAnalystConsensus: StockAnalystConsensus;
}
