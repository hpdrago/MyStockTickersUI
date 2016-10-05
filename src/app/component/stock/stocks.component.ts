import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { Stock } from "../../model/stock";
import { StockService } from "../../service/stock.service";
import { LoggerService } from "../../service/logger.service";
import { PaginationPage } from "../../common/pagination";
import { LazyLoadEvent } from "primeng/components/common/api";

@Component( {
    selector:    'my-stocks',
    templateUrl: 'stocks.component.html',
    styleUrls:   ['stocks.component.css']
} )
export class StocksComponent implements OnInit
{
    private stocksPage: PaginationPage<Stock>;
    private selectedStock: Stock;
    private stockService: StockService;
    private logger: LoggerService;
    private router: Router;
    private totalRecords: number;

    /**
     * Create a new instance with required DI sources
     * @param stockService
     * @param router
     */
    constructor( logger: LoggerService,
                 stockService: StockService,
                 router: Router )
    {
        this.logger = logger;
        this.stockService = stockService;
        this.router = router;
    }

    /**
     * This event is triggered by the DataTable containing the stocks to request the load of a new page of stocks
     * @param event
     */
    loadData( event: LazyLoadEvent ) : void
    {
        this.logger.log( 'stocksComponent.loadData ' + JSON.stringify( event ) );
        //event.first = First row offset
        //event.rows = Number of rows per page
        //event.sortField = Field name to sort in single sort mode
        //event.sortOrder = Sort order as number, 1 for asc and -1 for dec in single sort mode
        //multiSortMeta: An array of SortMeta objects used in multiple columns sorting. Each SortMeta has field and order properties.
        //filters: Filters object having field as key and filter value, filter matchMode as value
        this.stockService
            .getStocksPage( event.first )
            .subscribe( stocksPage => this.setStocksPage( stocksPage ), //Bind to view
                        err => {
                            // Log errors if any
                            console.log(err);
                        }
            );
    }

    /**
     * Get a single page of stocks
     */
    private getStocks(): void
    {
        this.stockService
            .getStocks()
            .subscribe( stocksPage => this.setStocksPage( stocksPage ), //Bind to view
                               err => {
                                        // Log errors if any
                                        console.log(err);
                                      }
            );
    }

    /**
     * Jump to the stock detail component
     */
    private gotoStockDetail(): void
    {
        let link = ['/stockDetail', this.selectedStock.tickerSymbol];
        this.router.navigate(link);
    }

    /**
     * A new stock page has been received
     * @param stocksPage
     */
    private setStocksPage( stocksPage: PaginationPage<Stock> ): void
    {
        this.logger.log( JSON.stringify( stocksPage ).valueOf() );
        this.totalRecords = stocksPage.totalElements;
        this.stocksPage = stocksPage;
        this.logger.log( 'stocksComponent.setStocksPage: length: ' + stocksPage.content.length );
        this.logger.log( 'stocksComponent.setStocksPage: totalElements: ' + stocksPage.totalElements );
    }

    private onRowSelect( event )
    {
        this.selectedStock = event.row;
        this.gotoStockDetail();
    }

    /**
     * This method is called when a user has selected a stock
     * @param stock
     */
    private onSelect( stock: Stock ) : void
    {
        this.selectedStock = stock;
    }

    /**
     * On application start up initialization
     */
    public ngOnInit(): void
    {
        this.logger.log( 'stocksComponent.ngOnInit' );
        this.getStocks();
    }

}
