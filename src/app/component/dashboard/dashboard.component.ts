/**
 * Created by mike on 9/19/2016.
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from "../common/base.component";
import { StockCrudService } from "../../service/crud/stock-crud.service";
import { ToastsManager } from "ng2-toastr";
import { Stock } from "../../model/entity/stock";
import { StockNotesTableTabComponent } from "../stocknotes/stock-notes-table-tab.component";
import { StockNotesTableDashboardComponent } from "./stock-notes-table-dashboard.component";
import { StockAnalystConsensusDashboardTableComponent } from "./stock-analyst-consensus-dashboard-table.component";
import { StockToBuyTableDashboardComponent } from "./stock-to-buy-table-dashboard.component";
import { StockCatalystEventTableComponent } from "../stockcatalystevent/stock-catalyst-event-table.component";
import { StockAutoCompleteComponent } from "../common/stock-autocomplete.component";

@Component(
{
   selector: 'my-dashboard',
   styleUrls: ['./dashboard.component.css'],
   templateUrl: './dashboard.component.html'
})
export class DashboardComponent extends BaseComponent implements OnInit
{
    @ViewChild(StockNotesTableDashboardComponent)
    private stockNotesTableDashboardComponent: StockNotesTableDashboardComponent;
    @ViewChild(StockAnalystConsensusDashboardTableComponent)
    private stockAnalystConsensusDashboardTableComponent: StockAnalystConsensusDashboardTableComponent;
    @ViewChild(StockToBuyTableDashboardComponent)
    private stockToBuyTableDashboardComponent: StockToBuyTableDashboardComponent
    @ViewChild(StockCatalystEventTableComponent)
    private stockCatalystEventTableComponent: StockCatalystEventTableComponent;
    @ViewChild(StockAutoCompleteComponent)
    private stockAutoCompletedComponent: StockAutoCompleteComponent;

    constructor( protected toaster: ToastsManager,
                 private router: Router,
                 private stockService: StockCrudService )
    {
        super( toaster );
    }

    public ngOnInit(): void
    {
    }

    /**
     * This method is called when the user enters a ticker symbol in the search box
     * @param {Stock} stock
     */
    protected onStockSelected(  stock: Stock  )
    {
        this.stockNotesTableDashboardComponent.loadTableForTickerSymbol( stock.tickerSymbol );
        this.stockToBuyTableDashboardComponent.loadTableForTickerSymbol( stock.tickerSymbol );
        this.stockAnalystConsensusDashboardTableComponent.loadTableForTickerSymbol( stock.tickerSymbol );
        this.stockCatalystEventTableComponent.loadTableForTickerSymbol( stock.tickerSymbol );
    }

    /**
     * This method is called when the user clicks the reset button to clear the ticker symbol search.
     */
    protected onResetButtonClick()
    {
        this.stockNotesTableDashboardComponent.refreshTable();
        this.stockToBuyTableDashboardComponent.refreshTable();
        this.stockAnalystConsensusDashboardTableComponent.refreshTable();
        this.stockCatalystEventTableComponent.refreshTable();
        this.stockAutoCompletedComponent.reset();
    }
}

