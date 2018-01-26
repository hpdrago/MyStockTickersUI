import { Component, ViewChild } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { TradeItService } from "../../service/tradeit/tradeit.service";
import { TradeItAccount } from "../../model/entity/tradeit-account";
import { BaseComponent } from "../common/base.component";
import { TradeItAccountTableComponent } from "./tradeit-account-table.component";
import { LinkedAccountTableComponent } from "../linked-account/linked-account-table.component";
import { TradeItAccountStateStore } from './tradeit-account-state-store';
import { TradeItAccountController } from './tradeit-controller';
import { LinkedAccountStateStore } from '../linked-account/linked-account-state-store';
import { LinkedAccountController } from '../linked-account/linked-account-controller';

/**
 * Created by mike on 10/8/2016.
 */
@Component(
    {
        selector:    'tradeit-accounts',
        templateUrl: './tradeit-accounts.component.html',
        providers: [TradeItAccountStateStore, TradeItAccountController,
                    LinkedAccountStateStore, LinkedAccountController]
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
        let methodName = "tradeItAccountSelected";
        this.log( methodName + " " + JSON.stringify( tradeItAccount ));
        this.linkedAccountTableComponent.loadAccounts( tradeItAccount );
    }
}
