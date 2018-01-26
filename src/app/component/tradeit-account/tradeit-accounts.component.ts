import { Component, OnInit, ViewChild } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { TradeItAccount } from "../../model/entity/tradeit-account";
import { BaseComponent } from "../common/base.component";
import { TradeItAccountTableComponent } from "./tradeit-account-table.component";
import { LinkedAccountTableComponent } from "../linked-account/linked-account-table.component";
import { TradeItAccountStateStore } from './tradeit-account-state-store';
import { TradeItAccountController } from './tradeit-account-controller';
import { LinkedAccountStateStore } from '../linked-account/linked-account-state-store';
import { LinkedAccountController } from '../linked-account/linked-account-controller';
import { TradeItAccountCrudActionHandler } from './tradeit-account-crud-action-handler';
import { LinkedAccountCrudActionHandler } from '../linked-account/linked-account-crud-action-handler';
import { StockPositionTableComponent } from '../stock-position/stock-position-table.component';
import { LinkedAccount } from '../../model/entity/linked-account';

/**
 * Created by mike on 10/8/2016.
 */
@Component(
    {
        selector:    'tradeit-accounts',
        templateUrl: './tradeit-accounts.component.html',
        providers: [TradeItAccountStateStore, TradeItAccountController, TradeItAccountCrudActionHandler,
                    LinkedAccountStateStore, LinkedAccountController, LinkedAccountCrudActionHandler]
    })
export class TradeItAccountsComponent extends BaseComponent implements OnInit
{
    @ViewChild(TradeItAccountTableComponent)
    private tradeItAccountTableComponent: TradeItAccountTableComponent;

    @ViewChild(LinkedAccountTableComponent)
    private linkedAccountTableComponent: LinkedAccountTableComponent;

    @ViewChild(StockPositionTableComponent)
    private stockPositionTableComponent: StockPositionTableComponent;

    private tradeItAccount: TradeItAccount;
    private linkedAccount: LinkedAccount;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {TradeItAccountController} tradeItAccountController
     * @param {LinkedAccountController} linkedAccountController
     */
    constructor( protected toaster: ToastsManager,
                 protected tradeItAccountController: TradeItAccountController,
                 protected linkedAccountController: LinkedAccountController )
    {
        super( toaster );
    }

    /**
     * Constructor.
     */
    public ngOnInit(): void
    {
        this.addSubscription( 'tradeItAccountController.tableSelectionChange',
            this.tradeItAccountController
                .subscribeToTableSelectionChangeEvent( (tradeItAccount: TradeItAccount) =>
                                                       this.onTradeItTableSelectionChange( tradeItAccount )));
        this.addSubscription(  'linkedAccountController.tableSelectionChange',
            this.linkedAccountController
                .subscribeToTableSelectionChangeEvent( (linkedAccount: LinkedAccount) =>
                                                           this.onLinkedAccountTableSelectionChange( linkedAccount )));
    }

    /**
     * Sets the {@code tradeItAccount}, loads the linked account table with account in the {@code tradeItAccount}
     * instance, and clears the positions table since no linked account is selected yet.
     * @param {TradeItAccount} tradeItAccount
     */
    private onTradeItTableSelectionChange( tradeItAccount: TradeItAccount )
    {
        let methodName = 'onTradeItTableSelectionChange';
        this.log( methodName + '.begin ' + JSON.stringify( tradeItAccount ) );
        this.tradeItAccount = tradeItAccount;
        this.linkedAccountTableComponent
            .setTradeItAccount( this.tradeItAccount );
        this.stockPositionTableComponent
            .clearTable();
        this.log( methodName + '.end' );
    }

    /**
     * Sets the {@code this.linkedAccount} and sends the linked account and TradeIt account to the postions table
     * triggering it to load the positions.
     * @param {LinkedAccount} linkedAccount
     */
    private onLinkedAccountTableSelectionChange( linkedAccount: LinkedAccount )
    {
        let methodName = 'onLinkedAccountTableSelectionChange';
        this.log( methodName + '.begin ' + JSON.stringify( linkedAccount ) );
        this.linkedAccount = linkedAccount;
        this.stockPositionTableComponent
            .setTradeItAccount( this.tradeItAccount );
        this.stockPositionTableComponent
            .setLinkedAccount( this.linkedAccount );
        this.log( methodName + '.end' );
    }
}
