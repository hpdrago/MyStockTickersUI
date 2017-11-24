import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockToBuyCrudServiceContainer } from "./stock-to-buy-crud-service-container";
import { StockNotesCrudServiceContainer } from "../stocknotes/stock-notes-crud-service-container";
import { StockQuoteRefreshService } from "../../service/stock-quote-refresh.service";
import { StockToBuyTableComponent } from "./stock-to-buy-table.component";

/**
 * This component displays a list of Stocks to buy.
 *
 * Created by mike on 10/24/2017.
 */
@Component(
    {
        selector:    'stock-to-buy-tab-table',
        styleUrls:   ['./stock-to-buy-table.component.css'],
        templateUrl: './stock-to-buy-table-tab.component.html'
    } )
export class StockToBuyTableTabComponent extends StockToBuyTableComponent
{
    constructor( protected toaster: ToastsManager,
                 protected stockToBuyServiceContainer: StockToBuyCrudServiceContainer,
                 protected stockNotesServiceContainer: StockNotesCrudServiceContainer,
                 protected stockQuoteRefreshService: StockQuoteRefreshService )
    {
        super( toaster, stockToBuyServiceContainer, stockNotesServiceContainer, stockQuoteRefreshService );
    }

}
