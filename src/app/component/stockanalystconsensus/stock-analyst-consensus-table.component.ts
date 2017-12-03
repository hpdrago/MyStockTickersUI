import { StockAnalystConsensus } from "../../model/entity/stock-analyst-consensus";
import { ToastsManager } from "ng2-toastr";
import { StockAnalystConsensusCrudServiceContainer } from "./stock-analyst-consensus-crud-service-container";
import { StockQuoteModelObjectTableComponent } from "../stockquote/stock-quote-modelobject-table.component";
import { StockQuoteRefreshService } from "../../service/stock-quote-refresh.service";
import { StockUrlMap } from "../../common/stock-url-map";

/**
 * This is the base class for the tab and dashboard table for Stock Analyst Consensus information
 */
export abstract class StockAnalystConsensusTableComponent extends StockQuoteModelObjectTableComponent<StockAnalystConsensus>
{
    protected urlMap: StockUrlMap = new StockUrlMap();
    constructor( protected toaster: ToastsManager,
                 protected StockAnalystConsensusServiceContainer: StockAnalystConsensusCrudServiceContainer,
                 protected stockQuoteRefreshService: StockQuoteRefreshService )
    {
        super( toaster, StockAnalystConsensusServiceContainer, stockQuoteRefreshService );
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

    /**
     * Calculates the amount of upside potential from current stock price to the average analyst price
     * @param rowData
     * @returns {number}
     */
    protected calcAvgUpsidePercent( rowData ): number
    {
        if ( rowData.lastPrice != null &&
             rowData.avgAnalystPriceTarget != null &&
             rowData.avgAnalystPriceTarget > 0.0 )
        {
            if ( rowData.lastPrice < rowData.avgAnalystPriceTarget )
            {
                return rowData.lastPrice / rowData.avgAnalystPriceTarget;
            }
            else
            {
                return 1 - (rowData.lastPrice / rowData.avgAnalystPriceTarget);
            }
        }
        else
        {
            return 0;
        }
    }
}
