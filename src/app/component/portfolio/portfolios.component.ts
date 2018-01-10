import { BaseComponent } from "../common/base.component";
import { Component, ViewChild } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CustomerAccountSelectionTableComponent } from "../customeraccount/customer-account-selection-table.component";
import { PortfolioTableComponent } from "./portfolio-table.component";
import { CustomerAccount } from "../../model/entity/customer-account";

/**
 * This is the main display component for portfolios.
 * It lists the accounts on the left hand side, the portfolios for the accounts at the top, and the portfolio stocks
 * at the bottom.
 *
 * Created by mike on 1/9/2018.
 */
@Component(
    {
        selector: 'portfolios',
        templateUrl: './portfolios.component.html'
    })
export class PortfoliosComponent extends BaseComponent
{
    @ViewChild( CustomerAccountSelectionTableComponent )
    private customerAccountSelectionTable: CustomerAccountSelectionTableComponent;
    @ViewChild( PortfolioTableComponent )
    private portfolioTableComponent: PortfolioTableComponent;

    constructor( protected toaster: ToastsManager )
    {
        super( toaster );
    }

    private customerAccountSelected( customerAccount: CustomerAccount )
    {
        this.log( "customerAccountSelected: " + JSON.stringify( customerAccount ));
    }
}
