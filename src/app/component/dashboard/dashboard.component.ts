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

    constructor( protected toaster: ToastsManager,
                 private router: Router,
                 private stockService: StockCrudService )
    {
        super( toaster );
    }

    public ngOnInit(): void
    {
    }

    protected onStockSelected(  stock: Stock  )
    {
        this.stockNotesTableDashboardComponent.loadTableForTickerSymbol( stock.tickerSymbol );
        this.stockToBuyTableDashboardComponent.loadTableForTickerSymbol( stock.tickerSymbol );
        this.stockAnalystConsensusDashboardTableComponent.loadTableForTickerSymbol( stock.tickerSymbol );
    }
}

