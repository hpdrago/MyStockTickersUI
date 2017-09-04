/**
 * Created by mike on 9/19/2016.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from "../common/base.component";
import { StockCrudService } from "../../service/crud/stock-crud.service";
import { ToastsManager } from "ng2-toastr";

@Component(
{
   selector: 'my-dashboard',
   styleUrls: ['./dashboard.component.css'],
   templateUrl: './dashboard.component.html'
})
export class DashboardComponent extends BaseComponent implements OnInit
{
    constructor( protected toaster: ToastsManager,
                 private router: Router,
                 private stockService: StockCrudService )
    {
        super( toaster );
    }

    ngOnInit(): void
    {
    }

}

