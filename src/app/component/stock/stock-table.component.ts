import { Component } from "@angular/core";
import { Stock } from "../../model/class/stock";
import { PaginationPage } from "../../common/pagination";
import { LazyLoadEvent } from "primeng/components/common/api";
import { CrudTableComponent } from "../common/crud-table.component";
import { StockFactory } from "../../model/factory/stock.factory";
import { StockCrudService } from "../../service/stock-crud.service";
import { ToastsManager } from "ng2-toastr";
import { StockFormService } from "./stock-form.service";
import { StockPanelButtonsService } from "./stock-panel-buttons.service";
import { StockTableButtonsService } from "./stock-table-buttons.service";
import { StockDialogService } from "./stock-dialog.service";

/**
 * This component lists the all of the stocks in the database.
 */
@Component( {
    selector:    'stock-table',
    templateUrl: './stock-table.component.html',
    styleUrls:   ['./stock-table.component.css'],
    outputs: ['modelObject']
} )
export class StockTableComponent extends CrudTableComponent<Stock>
{
    private companyNameSearch: string;
    private lastLoadEvent: LazyLoadEvent;

    /**
     * Create a new instance with required DI sources
     */
    constructor( protected toaster: ToastsManager,
                 protected stockFactory: StockFactory,
                 protected stockCrudService: StockCrudService,
                 protected stockFormService: StockFormService,
                 protected stockPanelButtonsService: StockPanelButtonsService,
                 protected stockDialogService: StockDialogService,
                 protected stockTableButtonsService: StockTableButtonsService )
    {
        super( toaster, stockFactory, stockCrudService, stockPanelButtonsService,
               stockDialogService, stockTableButtonsService );
    }

    /**
     * This event is triggered by the DataTable containing the stocks to request the load of a new page of stocks
     * @param event
     */
    protected lazyLoadData( event: LazyLoadEvent ) : void
    {
        this.logger.log( 'lazyLoadData ' + JSON.stringify( event ) );
        this.stockCrudService
            .getStocksPage( event.first, event.rows )
            .subscribe( stocksPage =>
                        {
                            this.setStocksPage( stocksPage );
                            //alert( JSON.stringify( stocksPage))
                        }, //Bind to view
                        err =>
                        {
                            // Log errors if any
                            this.reportRestError( err );
                        } );
        this.lastLoadEvent = event;
    }

    /**
     * Load the stocks table with company names or ticker symbols matching {@code searchString}
     * @param searchString
     */
    private getStockCompaniesLike( searchString: string )
    {
        this.logger.log( 'getStockCompaniesLike ' + searchString );
        this.stockCrudService
            .getStockCompaniesLike( searchString )
            .subscribe( stocksPage =>
            {
                this.setStocksPage( stocksPage );
                //alert( JSON.stringify( stocksPage))
            }, //Bind to view
            error =>
            {
                // Log errors if any
                this.reportRestError( error );
            } );
    }

    /**
     * A new stock page has been received
     * @param stocksPage
     */
    private setStocksPage( stocksPage: PaginationPage<Stock> ): void
    {
        this.logger.log( "setStocksPage" );
        //this.logger.log( JSON.stringify( stocksPage ).valueOf() );
        //this.stocksPage = stocksPage;
        this.rows = this.stockFactory.newModelObjectArray( stocksPage.content );
        for ( var stock of this.rows )
        {
            this.logger.log( "setStockPage.stock: " + JSON.stringify( stock ) );
            stock.isUserEntered();
        }
        this.totalRows = stocksPage.totalElements;
        this.logger.log( 'setStocksPage: length: ' + stocksPage.content.length );
        this.logger.log( 'setStocksPage: totalElements: ' + stocksPage.totalElements );
    }

    /*****************************************************************
     *  E V E N T S
     *****************************************************************/
    private onCompanyNameSearch( event )
    {
        this.logger.log( 'onCompanyNameSearch ' + this.companyNameSearch );
        if ( this.companyNameSearch && this.companyNameSearch.length > 0 )
        {
            this.getStockCompaniesLike( this.companyNameSearch );
        }
    }

    private onClearCompanySearch( event )
    {
        this.companyNameSearch = '';
    }

    /**
     * this method is called as an event from the stock form to jump to a stock company in the table
     * @param stock
     */
    private onJumpToStock( stock: Stock )
    {
        this.logger.log( 'onJumpToStock()'  );
        this.getStockCompaniesLike( stock.tickerSymbol );
    }
}
