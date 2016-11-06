/**
 * Created by mike on 9/19/2016.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Stock } from '../../model/stock';
import { StockService } from '../../service/stock.service';

@Component(
{
   selector: 'my-dashboard',
   styleUrls: ['dashboard.component.css'],
   templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit
{
    constructor( private router: Router,
                 private stockService: StockService )
    {
    }

    ngOnInit(): void
    {
    }

}

