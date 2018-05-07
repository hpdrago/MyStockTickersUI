/**
 * Created by mike on 9/19/2016.
 */
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from "../common/base.component";
import { StockInformationService } from "../../service/crud/stock-information.service";
import { ToastsManager } from "ng2-toastr";
import { StockCompany } from "../../model/entity/stockCompany";
import { StockNotesTableDashboardComponent } from "./stock-notes-table-dashboard.component";
import { StockAnalystConsensusDashboardTableComponent } from "./stock-analyst-consensus-dashboard-table.component";
import { StockToBuyTableDashboardComponent } from "./stock-to-buy-table-dashboard.component";
import { StockSearchComponent } from "../common/stock-search.component";
import { StockCatalystEventDashboardTableComponent } from './stock-catalyst-event-dashboard-table.component';

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
    @ViewChild(StockNotesTableDashboardComponent)
    private stockNotesTableDashboardComponent: StockNotesTableDashboardComponent;
    @ViewChild(StockAnalystConsensusDashboardTableComponent)
    private stockAnalystConsensusDashboardTableComponent: StockAnalystConsensusDashboardTableComponent;
    @ViewChild(StockToBuyTableDashboardComponent)
    private stockToBuyTableDashboardComponent: StockToBuyTableDashboardComponent
    @ViewChild(StockCatalystEventDashboardTableComponent)
    private stockCatalystEventDashboardTableComponent: StockCatalystEventDashboardTableComponent;
    @ViewChild(StockSearchComponent)
    private stockSearchComponent: StockSearchComponent;

    constructor( protected toaster: ToastsManager,
                 private router: Router,
                 private stockService: StockInformationService )
    {
        super( toaster );
    }

    /**
     * This method is called when the user enters a ticker symbol in the search box
     * @param {StockCompany} stock
     */
    protected onStockSelected( stock: StockCompany )
    {
        this.stockNotesTableDashboardComponent.loadTableForTickerSymbol( stock.tickerSymbol );
        this.stockToBuyTableDashboardComponent.loadTableForTickerSymbol( stock.tickerSymbol );
        this.stockAnalystConsensusDashboardTableComponent.loadTableForTickerSymbol( stock.tickerSymbol );
        this.stockCatalystEventDashboardTableComponent.loadTableForTickerSymbol( stock.tickerSymbol );
    }

    /**
     * This method is called when the user clicks the reset button to clear the ticker symbol search.
     */
    protected onResetButtonClick()
    {
        this.stockNotesTableDashboardComponent.refreshTable();
        this.stockToBuyTableDashboardComponent.refreshTable();
        this.stockAnalystConsensusDashboardTableComponent.refreshTable();
        this.stockCatalystEventDashboardTableComponent.refreshTable();
    }
}

