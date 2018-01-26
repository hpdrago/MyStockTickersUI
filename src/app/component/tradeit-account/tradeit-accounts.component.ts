import { Component, OnInit, ViewChild } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { TradeItAccountPanelComponent } from "./tradeit-account-panel.component";
import { TradeItAccountCrudServiceContainer } from "./tradeit-account-crud-service-container";
import { TradeitAccountBaseTableComponent } from "./tradeit-account-base-table.component";
import { TradeItService } from "../../service/tradeit/tradeit.service";
import { TradeItAccount } from "../../model/entity/tradeit-account";
import { BaseComponent } from "../common/base.component";
import { TradeItAccountTableComponent } from "./tradeit-account-table.component";
import { LinkedAccountTableComponent } from "../linked-account/linked-account-table.component";

/**
 * Created by mike on 10/8/2016.
 */
@Component(
    {
        selector:    'tradeit-accounts',
        templateUrl: './tradeit-accounts.component.html'
    })
export class TradeItAccountsComponent extends BaseComponent
{
    @ViewChild(TradeItAccountTableComponent)
    private tradeItAccountTableComponent: TradeItAccountTableComponent;

    @ViewChild(LinkedAccountTableComponent)
    private linkedAccountTableComponent: LinkedAccountTableComponent;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {TradeItAccountCrudServiceContainer} customerAccountCrudServiceContainer
     * @param {TradeItService} tradeItService
     */
    constructor( protected toaster: ToastsManager )
    {
        super( toaster );
    }

    /**
     * This method is called when the user clicks on an account in the TradeItAccount table (the one on the left).
     * Subsequently, the LinkedAccountTable is notified to display the linked accounts for the TradeItAccount;
     * @param {TradeItAccount} tradeItAccount
     * @constructor
     */
    public tradeItAccountSelected( tradeItAccount: TradeItAccount ): void
    {
        this.linkedAccountTableComponent.loadAccounts( tradeItAccount );
    }
}
