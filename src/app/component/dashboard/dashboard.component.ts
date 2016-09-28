/**
 * Created by mike on 9/19/2016.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Stock } from '../../model/stock';
import { StockService } from '../../service/stock.service';
import { EmitterService } from '../../service/emitter.service';

@Component(
{
   selector: 'my-dashboard',
   styleUrls: ['dashboard.component.css'],
   templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit
{
    stocks: Stock[] = [];

    constructor( private router: Router,
                 private stockService: StockService )
    {
    }

    ngOnInit(): void
    {
        this.stockService
            .getStocks()
            .subscribe( page => this.stocks = page.content.slice(0, 5), //Bind to view
                err => {
                    // Log errors if any
                    console.log(err);
                }
            );
    }

    gotoStockDetail( stock: Stock ): void
    {
        let link = ['/stockDetail', stock.tickerSymbol];
        this.router.navigate(link);
    }

}

