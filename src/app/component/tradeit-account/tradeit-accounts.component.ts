import { Component, OnInit } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { TradeItAccount } from "../../model/entity/tradeit-account";
import { BaseComponent } from "../common/base.component";
import { TradeItAccountController } from './tradeit-account-controller';
import { LinkedAccountController } from '../linked-account/linked-account-controller';
import { LinkedAccount } from '../../model/entity/linked-account';
import { isNullOrUndefined } from 'util';

/**
 * Created by mike on 10/8/2016.
 */
@Component(
    {
        selector:    'tradeit-accounts',
        templateUrl: './tradeit-accounts.component.html'
    })
export class TradeItAccountsComponent extends BaseComponent implements OnInit
{
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

    protected portfolioTabDisabled(): boolean
    {
        return isNullOrUndefined( this.linkedAccount ) ||
               isNullOrUndefined( this.tradeItAccount );
    }

    /**
     * Sets the {@code tradeItAccount}, loads the linked account table with account in the {@code tradeItAccount}
     * instance, and clears the positions table since no linked account is selected yet.
     * @param {TradeItAccount} tradeItAccount
     */
    private onTradeItTableSelectionChange( tradeItAccount: TradeItAccount )
    {
        const methodName = 'onTradeItTableSelectionChange';
        this.log( methodName + '.begin ' + JSON.stringify( tradeItAccount ) );
        this.tradeItAccount = tradeItAccount;
        this.log( methodName + '.end' );
    }

    /**
     * Sets the {@code this.linkedAccount} and sends the linked account and TradeIt account to the postions table
     * triggering it to load the positions.
     * @param {LinkedAccount} linkedAccount
     */
    private onLinkedAccountTableSelectionChange( linkedAccount: LinkedAccount )
    {
        const methodName = 'onLinkedAccountTableSelectionChange';
        this.log( methodName + '.begin ' + JSON.stringify( linkedAccount ) );
        this.linkedAccount = linkedAccount;
        this.log( methodName + '.end' );
    }
}
