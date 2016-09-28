import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { Stock } from "../../model/stock";
import { StockService } from "../../service/stock.service";
import { PaginationPage } from "../../common/pagination";

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
    private router: Router;

    /**
     * Create a new instance with required DI sources
     * @param stockService
     * @param router
     */
    constructor( stockService: StockService,
                 router: Router )
    {
        this.stockService = stockService;
        this.router = router;
    }

    /**
     * This method is called when a user has selected a stock
     * @param stock
     */
    onSelect( stock: Stock ) : void
    {
        this.selectedStock = stock;
    }

    /**
     * Get a single page of stocks
     */
    getStocks(): void
    {
        this.stockService
            .getStocks()
            .subscribe( stocksPage => this.stocksPage = stocksPage, //Bind to view
                        err => {
                            // Log errors if any
                            console.log(err);
                        }
            );
    }

    /**
     * Jump to the stock detail component
     */
    gotoStockDetail(): void
    {
        let link = ['/stockDetail', this.selectedStock.tickerSymbol];
        this.router.navigate(link);
    }

    /**
     * On application start up initialization
     */
    ngOnInit(): void
    {
        this.getStocks();
    }

}
