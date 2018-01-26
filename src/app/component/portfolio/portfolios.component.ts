import { BaseComponent } from "../common/base.component";
import { Component, ViewChild } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { TradeItAccountSelectionTableComponent } from "../tradeit-account/tradeit-account-selection-table.component";
import { PortfolioTableComponent } from "./portfolio-table.component";
import { TradeItAccount } from "../../model/entity/tradeit-account";

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
    private tradeItAccount: TradeItAccount;

    @ViewChild( TradeItAccountSelectionTableComponent )
    private customerAccountSelectionTable: TradeItAccountSelectionTableComponent;

    @ViewChild( PortfolioTableComponent )
    private portfolioTableComponent: PortfolioTableComponent;

    constructor( protected toaster: ToastsManager )
    {
        super( toaster );
    }

    protected customerAccountSelected( tradeItAccount: TradeItAccount )
    {
        this.log( "customerAccountSelected: " + JSON.stringify( tradeItAccount ));
        this.tradeItAccount = tradeItAccount;
    }
}
