/**
 * Created by mike on 9/13/2016.
 */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Stock } from '../../model/stock';
import { StockService } from '../../service/stock.service';

@Component({
    selector:    'stock-detail',
    templateUrl: 'stock-detail.component.html',
    styleUrls:   ['stock-detail.component.css']
})
export class StockDetailComponent implements OnInit
{
    @Input()
    stock: Stock;

    constructor( private stockService: StockService,
                 private route: ActivatedRoute )
    {
    }

    ngOnInit(): void
    {
        this.route.params.forEach( (params: Params) =>
        {
            let tickerSymbol = params['tickerSymbol']  ;
            this.stockService
                .getStock( tickerSymbol )
                .subscribe( stock => this.stock = stock, //Bind to view
                            err => {
                                // Log errors if any
                                console.log(err);
                            }
                );
        });
    }

    goBack(): void
    {
        window.history.back();
    }
}
