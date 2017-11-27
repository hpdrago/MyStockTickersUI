import { Component } from "@angular/core";
import { StockAnalystConsensusTableComponent } from "../stockanalystconsensus/stock-analyst-consensus-table.component";
import { ToastsManager } from "ng2-toastr";
import { StockAnalystConsensusCrudServiceContainer } from "../stockanalystconsensus/stock-analyst-consensus-crud-service-container";
import { StockQuoteRefreshService } from "../../service/stock-quote-refresh.service";

/**
 * This component lists completed stock analyst consensus information on the Analyst Consensus tab
 *
 * Created by mike on 11/27/2017.
 */
@Component(
    {
        selector: 'stock-analyst-consensus-dashboard-table',
        styleUrls: ['../stockanalystconsensus/stock-analyst-consensus-table.component.css'],
        templateUrl: './stock-analyst-consensus-dashboard-table.component.html'
    } )
export class StockAnalystConsensusDashboardTableComponent extends StockAnalystConsensusTableComponent
{
    constructor( protected toaster: ToastsManager,
                 protected StockAnalystConsensusServiceContainer: StockAnalystConsensusCrudServiceContainer,
                 protected stockQuoteRefreshService: StockQuoteRefreshService )
    {
        super( toaster, StockAnalystConsensusServiceContainer, stockQuoteRefreshService );
    }
}
