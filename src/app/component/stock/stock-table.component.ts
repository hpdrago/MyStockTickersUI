/**
 * This component lists the all of the stocks
 */
import { Component, OnInit } from "@angular/core";
import { Stock } from "../../model/stock";
import { PaginationPage } from "../../common/pagination";
import { LazyLoadEvent } from "primeng/components/common/api";
import { CrudOperation } from "../common/crud-operation";
import { CrudTableComponent } from "../common/crud-table.component";
import { StockFactory } from "../../model/stock-factory";
import { StockPanelService } from "./stock-panel.service";
import { StockCrudService } from "../../service/stock-crud.service";
import { ToastsManager } from "ng2-toastr";

@Component( {
    selector:    'stock-table',
    templateUrl: './stock-table.component.html',
    styleUrls:   ['./stock-table.component.css'],
    outputs: ['selectedModelObject', 'displayableModelObject']
} )
export class StockTableComponent extends CrudTableComponent<Stock> implements OnInit
{
    private stocksPage: PaginationPage<Stock>;
    private companyNameSearch: string;
    private lastLoadEvent: LazyLoadEvent;

    /**
     * Create a new instance with required DI sources
     * @param stockService
     * @param router
     */
    constructor( protected toaster: ToastsManager,
                 protected stockService: StockCrudService,
                 protected stockFactory: StockFactory,
                 protected stockPanelService: StockPanelService )
    {
        super( toaster, stockFactory, stockPanelService, stockService );
    }

    public ngOnInit(): void
    {
        this.stocksPage =
        {
            content : [],
            last: false,
            first: true,
            number: 1,
            size: 20,
            totalElements: 0,
            totalPages : 0,
            itemsPerPage: 20,
            sort: []
        }
    }

    /**
     * This event is triggered by the DataTable containing the stocks to request the load of a new page of stocks
     * @param event
     */
    private lazyLoadData( event: LazyLoadEvent ) : void
    {
        this.logger.log( 'lazyLoadData ' + JSON.stringify( event ) );
        this.stockService
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
        this.stockService
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
        //this.logger.log( JSON.stringify( stocksPage ).valueOf() );
        this.totalRecords = stocksPage.totalElements;
        this.stocksPage = stocksPage;
        this.logger.log( 'setStocksPage: length: ' + stocksPage.content.length );
        this.logger.log( 'setStocksPage: totalElements: ' + stocksPage.totalElements );
    }

    private save()
    {
        if ( this.crudOperation == CrudOperation.INSERT  )
        {
            this.stocksPage.content.push( this.displayableModelObject );
        }
        else
        {
            this.stocksPage.content[this.findSelectedStockIndex()] ;
            this.displayableModelObject = null;
        }
    }

    /**
     * Determines the index of selectedStock in the stockPage.content array
     * @returns {number}
     */
    private findSelectedStockIndex(): number
    {
        for ( var i = 0; i < this.stocksPage.content.length; i++ )
        {
            var stock = this.stocksPage.content[i];
            if ( stock.tickerSymbol === this.selectedModelObject.tickerSymbol )
            {
                return i;
            }
        }
        throw new Error( "Could not find ticker symbol " + this.selectedModelObject.tickerSymbol );
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
