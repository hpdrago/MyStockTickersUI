/**
 * This component lists the all of the stocks
 */
import { OnInit, Component } from "@angular/core";
import { Router }         from '@angular/router';
import { Stock }          from "../../model/stock";
import { StockService }   from "../../service/stock.service";
import { Logger }         from "../../service/logger.service";
import { PaginationPage } from "../../common/pagination";
import { LazyLoadEvent }  from "primeng/components/common/api";
import { CrudOperation }  from "../../common/crud-operation";
import { SessionService } from "../../service/session.service";

@Component( {
    selector:    'stock-table',
    templateUrl: 'stock-table.component.html',
    styleUrls:   ['stock-table.component.css'],
    providers:   [Logger]
} )
export class StockTableComponent implements OnInit
{
    /*
     * Instance variables
     */
    private stocksPage: PaginationPage<Stock>;
    private selectedStock: Stock = null;
    private displayableStock: Stock;
    private crudOperation: CrudOperation;
    private totalRecords: number;
    private companyNameSearch: string;
    private lastLoadEvent: LazyLoadEvent;

    /**
     * Create a new instance with required DI sources
     * @param stockService
     * @param router
     */
    constructor( private logger: Logger,
                 private stockService: StockService,
                 private router: Router,
                 private session: SessionService )
    {
        this.logger.setClassName( StockTableComponent.name );
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
                            console.log( err );
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
            .getStocksCompaniesLike( searchString )
            .subscribe( stocksPage =>
                {
                    this.setStocksPage( stocksPage );
                    //alert( JSON.stringify( stocksPage))
                }, //Bind to view
                err =>
                {
                    // Log errors if any
                    console.log( err );
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

    /**
     * Jump to the stock detail component
     */
    private gotoStockDetail(): void
    {
        let link = ['/stockDetail', this.selectedStock.tickerSymbol];
        this.router.navigate(link);
    }

    private showFormToAdd()
    {
        this.crudOperation = CrudOperation.INSERT;
        this.displayableStock = new Stock( '', '', '', 0, false );
    }

    private showFormToEdit()
    {
        this.crudOperation = CrudOperation.UPDATE;
        this.displayableStock = this.selectedStock;
    }

    private save()
    {
        if ( this.crudOperation == CrudOperation.INSERT  )
        {
            this.stocksPage.content.push( this.displayableStock );
        }
        else
        {
            this.stocksPage.content[this.findSelectedStockIndex()] ;
            this.displayableStock = null;
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
            if ( stock.tickerSymbol === this.selectedStock.tickerSymbol )
            {
                return i;
            }
        }
        throw new Error( "Could not find ticker symbol " + this.selectedStock.tickerSymbol );
    }

    /**
     * Determines if the Add button should be disabled
     * @returns {boolean}
     */
    public isAddButtonDisabled(): boolean
    {
        return false;
    }

    /*****************************************************************
     *  E V E N T S
     *****************************************************************/
    private onCompanyNameSearch( event )
    {
        this.logger.log( 'onCompanyNameSearch()' + this.companyNameSearch );
        if ( this.companyNameSearch && this.companyNameSearch.length > 0 )
        {
            this.getStockCompaniesLike( this.companyNameSearch );
        }
    }

    private onClearCompanySearch( event )
    {
        this.companyNameSearch = '';
    }

    private onEditComplete( event ): void
    {
        this.logger.log( 'onEditComplete()' );
        this.stockService.updateStock( this.selectedStock );
    }

    /**
     * On application start up initialization
     */
    public ngOnInit(): void
    {
        //this.logger.log( 'ngOnInit()' );
        //this.loadPage( 0, 20 );
    }

    /**
     * this method is called when the user clicks on the Sav button on the stock for.
     */
    public onStockFormButtonSave(): void
    {
        this.logger.log( 'onStockFormButtonSave()' );
        this.crudOperation = CrudOperation.NONE;
        this.lazyLoadData( this.lastLoadEvent );
    }

    /**
     * this method is called when the user clicks on the Sav button on the stock for.
     */
    public onStockFormButtonAdd(): void
    {
        this.logger.log( 'onStockFormButtonAdd()' );
        this.crudOperation = CrudOperation.NONE;
        this.lazyLoadData( this.lastLoadEvent );
    }

    /**
     * this method is called when the user selects a row in the stock table
     * @param event
     */
    private onRowSelect( event ): void
    {
        this.logger.log( 'onRowSelect() ' + JSON.stringify( event ) );
        this.selectedStock = event.data;
        this.displayableStock = this.selectedStock;
        this.crudOperation = CrudOperation.UPDATE;
    }
}
