/**
 * Created by mike on 9/19/2016.
 */
import { Component, ViewChild } from '@angular/core';
import { BaseComponent } from "../common/base.component";
import { ToastsManager } from "ng2-toastr";
import { StockCompany } from "../../model/entity/stock-company";
import { StockSearchComponent } from "../common/stock-search.component";
import { StockNotesTableComponent } from '../stock-notes/stock-notes-table.component';
import { StockAnalystConsensusTableComponent } from '../stock-analyst-consensus/stock-analyst-consensus-table.component';
import { StockToBuyTableComponent } from '../stock-to-buy/stock-to-buy-table.component';
import { StockCatalystEventTableComponent } from '../stock-catalyst-event/stock-catalyst-event-table.component';

/**
 * This component displays four tables: stock notes, stock catalyst events, stocks to buy, and stock analyst consensus
 */
@Component(
{
   selector: 'my-dashboard',
   styleUrls: ['./dashboard.component.css'],
   templateUrl: './dashboard.component.html'
})
export class DashboardComponent extends BaseComponent
{
    @ViewChild(StockNotesTableComponent)
    private stockNotesTableComponent: StockNotesTableComponent;

    @ViewChild(StockAnalystConsensusTableComponent)
    private stockAnalystConsensusTableComponent: StockAnalystConsensusTableComponent;

    @ViewChild(StockToBuyTableComponent)
    private stockToBuyTableComponent: StockToBuyTableComponent

    @ViewChild(StockCatalystEventTableComponent)
    private stockCatalystEventTableComponent: StockCatalystEventTableComponent;

    @ViewChild(StockSearchComponent)
    private stockSearchComponent: StockSearchComponent;

    constructor( protected toaster: ToastsManager )
    {
        super( toaster );
    }

    /**
     * This method is called when the user enters a ticker symbol in the search box
     * @param {StockCompany} stock
     */
    protected onStockSelected( stock: StockCompany )
    {
        this.stockNotesTableComponent.loadTableForTickerSymbol( stock.tickerSymbol );
        this.stockToBuyTableComponent.loadTableForTickerSymbol( stock.tickerSymbol );
        this.stockAnalystConsensusTableComponent.loadTableForTickerSymbol( stock.tickerSymbol );
        this.stockCatalystEventTableComponent.loadTableForTickerSymbol( stock.tickerSymbol );
    }

    /**
     * This method is called when the user clicks the reset button to clear the ticker symbol search.
     */
    protected onResetButtonClick()
    {
        this.stockNotesTableComponent.refreshTable();
        this.stockToBuyTableComponent.refreshTable();
        this.stockAnalystConsensusTableComponent.refreshTable();
        this.stockCatalystEventTableComponent.refreshTable();
    }
}

