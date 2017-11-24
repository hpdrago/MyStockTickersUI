import { Component } from "@angular/core";
import { StockAnalystConsensus } from "../../model/entity/stock-analyst-consensus";
import { ToastsManager } from "ng2-toastr";
import { StockAnalystConsensusCrudServiceContainer } from "./stock-analyst-consensus-crud-service-container";
import { StockQuoteModelObjectTableComponent } from "../stockquote/stock-quote-modelobject-table.component";
import { StockQuoteRefreshService } from "../../service/stock-quote-refresh.service";
import { StockUrlMap } from "../../common/stock-url-map";

/**
 * This component lists all stock notes
 *
 * Created by mike on 10/30/2016.
 */
@Component(
    {
        selector: 'stock-analyst-consensus-table',
        styleUrls: ['./stock-analyst-consensus-table.component.css'],
        templateUrl: './stock-analyst-consensus-table.component.html'
    } )
export class StockAnalystConsensusTableComponent extends StockQuoteModelObjectTableComponent<StockAnalystConsensus>
{
    protected urlMap: StockUrlMap = new StockUrlMap();
    constructor( protected toaster: ToastsManager,
                 protected StockAnalystConsensusServiceContainer: StockAnalystConsensusCrudServiceContainer,
                 protected stockQuoteRefreshService: StockQuoteRefreshService )
    {
        super( toaster, StockAnalystConsensusServiceContainer, stockQuoteRefreshService );
    }

    protected getRowStyle( rowData: any, index: number ): string
    {
        return "rowStyle";
    }

    /**
     * This method is called after stockNotes are loaded from the database.
     * Once loaded, the stockNotes are expanded, one row per ticker symbol, into the table.
     * @param {StockNotes[]} stockNotes
     * @return {any}
     */
    protected onTableLoad( stockAnalystConsensus: StockAnalystConsensus[] )
    {
        this.urlMap.extractURLsFromNotes( stockAnalystConsensus );
        super.onTableLoad( stockAnalystConsensus );
    }
}
