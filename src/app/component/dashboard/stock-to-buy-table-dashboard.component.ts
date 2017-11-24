import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockToBuyCrudServiceContainer } from "../stocktobuy/stock-to-buy-crud-service-container";
import { StockNotesCrudServiceContainer } from "../stocknotes/stock-notes-crud-service-container";
import { StockQuoteRefreshService } from "../../service/stock-quote-refresh.service";
import { StockToBuyTableComponent } from "../stocktobuy/stock-to-buy-table.component";

/**
 * This component displays a list of Stocks to buy.
 *
 * Created by mike on 10/24/2017.
 */
@Component(
    {
        selector:    'stock-to-buy-dashboard-table',
        styleUrls:   ['../stocktobuy/stock-to-buy-table.component.css'],
        templateUrl: './stock-to-buy-table-dashboard.component.html'
    } )
export class StockToBuyTableDashboardComponent extends StockToBuyTableComponent
{
    constructor( protected toaster: ToastsManager,
                 protected stockToBuyServiceContainer: StockToBuyCrudServiceContainer,
                 protected stockNotesServiceContainer: StockNotesCrudServiceContainer,
                 protected stockQuoteRefreshService: StockQuoteRefreshService )
    {
        super( toaster, stockToBuyServiceContainer, stockNotesServiceContainer, stockQuoteRefreshService );
    }

}
