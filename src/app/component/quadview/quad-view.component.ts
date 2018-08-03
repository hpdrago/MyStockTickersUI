/**
 * Created by mike on 9/19/2016.
 */
import { Component, ViewChild } from '@angular/core';
import { BaseComponent } from "../common/base.component";
import { ToastsManager } from "ng2-toastr";
import { StockCompany } from "../../model/entity/stock-company";
import { StockSearchComponent } from "../common/stock-search.component";
import { StockAnalystConsensusTableComponent } from '../stock-analyst-consensus/stock-analyst-consensus-table.component';
import { StockToBuyTableComponent } from '../stock-to-buy/stock-to-buy-table.component';
import { StockCatalystEventTableComponent } from '../stock-catalyst-event/stock-catalyst-event-table.component';
import { StockNotesQuadViewTableComponent } from './stock-notes-quad-view-table.component';
import { StockAnalystConsensusQuadViewTableComponent } from './stock-analyst-consensus-quad-view-table.component';
import { StockToBuyQuadViewTableComponent } from './stock-to-buy-quad-view-table.component';
import { StockCatalystEventQuadViewTableComponent } from './stock-catalyst-event-quad-view-table.component';

/**
 * This component displays four tables: stock notes, stock catalyst events, stocks to buy, and stock analyst consensus
 */
@Component(
{
   selector:    'my-dashboard',
   styleUrls:   ['./quad-view.component.css'],
   templateUrl: './quad-view.component.html'
})
export class QuadViewComponent extends BaseComponent
{
    @ViewChild( StockNotesQuadViewTableComponent)
    private stockNotesDashboardTableComponent: StockNotesQuadViewTableComponent;

    @ViewChild( StockAnalystConsensusQuadViewTableComponent)
    private stockAnalystConsensusDashboardTableComponent: StockAnalystConsensusQuadViewTableComponent;

    @ViewChild( StockToBuyQuadViewTableComponent)
    private stockToBuyDashboardTableComponent: StockToBuyQuadViewTableComponent

    @ViewChild( StockCatalystEventQuadViewTableComponent)
    private stockCatalystEventDashboardTableComponent: StockCatalystEventQuadViewTableComponent;

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
        this.stockNotesDashboardTableComponent.loadTableForTickerSymbol( stock.tickerSymbol );
        this.stockToBuyDashboardTableComponent.loadTableForTickerSymbol( stock.tickerSymbol );
        this.stockAnalystConsensusDashboardTableComponent.loadTableForTickerSymbol( stock.tickerSymbol );
        this.stockCatalystEventDashboardTableComponent.loadTableForTickerSymbol( stock.tickerSymbol );
    }

    /**
     * This method is called when the user clicks the reset button to clear the ticker symbol search.
     */
    protected onResetButtonClick()
    {
        this.stockNotesDashboardTableComponent.resetTable();
        this.stockToBuyDashboardTableComponent.resetTable();
        this.stockAnalystConsensusDashboardTableComponent.resetTable();
        this.stockCatalystEventDashboardTableComponent.resetTable();
    }
}

