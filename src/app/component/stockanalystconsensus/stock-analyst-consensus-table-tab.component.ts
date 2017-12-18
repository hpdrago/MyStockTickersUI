/**
 * This component lists completed stock analyst consensus information on the Analyst Consensus tab
 *
 * Created by mike on 10/30/2016.
 */
import { Component } from "@angular/core";
import { StockAnalystConsensusTableComponent } from "./stock-analyst-consensus-table.component";
import { ToastsManager } from "ng2-toastr";
import { StockAnalystConsensusCrudServiceContainer } from "./stock-analyst-consensus-crud-service-container";
import { StockQuoteRefreshService } from "../../service/stock-quote-refresh.service";

@Component(
    {
        selector: 'stock-analyst-consensus-tab-table',
        styleUrls: ['./stock-analyst-consensus-table.component.css'],
        templateUrl: './stock-analyst-consensus-table-tab.component.html'
    } )
export class StockAnalystConsensusTableTabComponent extends StockAnalystConsensusTableComponent
{
    constructor( protected toaster: ToastsManager,
                 protected StockAnalystConsensusServiceContainer: StockAnalystConsensusCrudServiceContainer,
                 protected stockQuoteRefreshService: StockQuoteRefreshService )
    {
        super( toaster, StockAnalystConsensusServiceContainer, stockQuoteRefreshService );
    }
}
