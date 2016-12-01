/**
 * Created by mike on 9/19/2016.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Stock } from '../../model/stock';
import { StockService } from '../../service/stock.service';
import { BaseComponent } from "../common/base.component";

@Component(
{
   selector: 'my-dashboard',
   styleUrls: ['dashboard.component.css'],
   templateUrl: 'dashboard.component.html'
})
export class DashboardComponent extends BaseComponent implements OnInit
{
    constructor( private router: Router,
                 private stockService: StockService )
    {
        super();
    }

    ngOnInit(): void
    {
    }

}

