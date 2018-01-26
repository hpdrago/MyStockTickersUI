import { BaseComponent } from "../common/base.component";
import { Component, ViewChild } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { TradeItAccountSelectionTableComponent } from "../tradeit-account/tradeit-account-selection-table.component";
import { PortfolioTableComponent } from "./portfolio-table.component";
import { TradeItAccount } from "../../model/entity/tradeit-account";
import { PortfolioStateStore } from './portfolio-state-store';
import { PortfolioController } from './portfolio-controller';
import { TradeItAccountStateStore } from '../tradeit-account/tradeit-account-state-store';
import { TradeItAccountController } from '../tradeit-account/tradeit-account-controller';
import { TradeItAccountCrudActionHandler } from '../tradeit-account/tradeit-account-crud-action-handler';
import { PortfolioActionHandler } from './portfolio-action-handler';

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
        templateUrl: './portfolios.component.html',
        providers: [PortfolioStateStore, PortfolioController, PortfolioActionHandler,
                    TradeItAccountStateStore, TradeItAccountController, TradeItAccountCrudActionHandler]
    })
export class PortfoliosComponent extends BaseComponent
{
    private customerAccount: TradeItAccount;

    @ViewChild( TradeItAccountSelectionTableComponent )
    private customerAccountSelectionTable: TradeItAccountSelectionTableComponent;

    @ViewChild( PortfolioTableComponent )
    private portfolioTableComponent: PortfolioTableComponent;

    constructor( protected toaster: ToastsManager )
    {
        super( toaster );
    }

    protected customerAccountSelected( customerAccount: TradeItAccount )
    {
        this.log( "customerAccountSelected: " + JSON.stringify( customerAccount ));
        this.customerAccount = customerAccount;
    }
}
