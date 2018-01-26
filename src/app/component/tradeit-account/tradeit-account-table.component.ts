import { ToastsManager } from "ng2-toastr";
import { Component } from "@angular/core";
import { TradeItAccountBaseTableComponent } from "./tradeit-account-base-table.component";
import { TradeItService } from "../../service/tradeit/tradeit.service";
import { TradeItAccountOAuthService } from "../../service/tradeit/tradeit-account-oauth.service";
import { TradeItErrorReporter } from "../tradeit/tradeit-error-reporter";
import { TradeItAccountFactory } from '../../model/factory/tradeit-account.factory';
import { TradeItAccountController } from './tradeit-account-controller';
import { TradeItAccountStateStore } from './tradeit-account-state-store';
import { TradeItAccountCrudService } from '../../service/crud/tradeit-account-crud.service';
import { TradeItAccount } from '../../model/entity/tradeit-account';

/**
 * This component display the list of the customer's brokerage accounts
 *
 * Created by mike on 10/24/2017.
 */
@Component(
{
    selector:    'tradeit-account-table',
    styleUrls:   ['../crud/table/crud-table.component.css',
                  './tradeit-account-table.component.css'],
    templateUrl: './tradeit-account-table.component.html'
} )
export class TradeItAccountTableComponent extends TradeItAccountBaseTableComponent
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {TradeItErrorReporter} tradeItErrorReporter
     * @param {TradeItAccountStateStore} tradeItAccountStateStore
     * @param {TradeItAccountController} tradeItAccountController
     * @param {TradeItAccountFactory} tradeItAccountFactory
     * @param {TradeItAccountCrudService} tradeItAccountCrudService
     * @param {TradeItService} tradeItService
     * @param {TradeItAccountOAuthService} tradeItOAuthService
     */
    constructor( protected toaster: ToastsManager,
                 protected tradeItErrorReporter: TradeItErrorReporter,
                 protected tradeItAccountStateStore: TradeItAccountStateStore,
                 protected tradeItAccountController: TradeItAccountController,
                 protected tradeItAccountFactory: TradeItAccountFactory,
                 protected tradeItAccountCrudService: TradeItAccountCrudService,
                 protected tradeItService: TradeItService,
                 protected tradeItOAuthService: TradeItAccountOAuthService )
    {
        super( toaster,
               tradeItErrorReporter,
               tradeItAccountStateStore,
               tradeItAccountController,
               tradeItAccountFactory,
               tradeItAccountCrudService,
               tradeItService,
               tradeItOAuthService );
        this.tradeItAccountController
            .subscribeToAccountLinkedEvent( (tradeItAccount: TradeItAccount) => { this.onAccountLinkedEvent( tradeItAccount ); });
    }

    /**
     * This event indicates that a new account was added which is done outside the normal added operations so
     * we need to refresh the table.
     * @param {TradeItAccount} tradeItAccount
     */
    private onAccountLinkedEvent( tradeItAccount: TradeItAccount )
    {
        let methodName = 'nAccountLinkedEvent';
        this.log( methodName + ' ' + JSON.stringify( tradeItAccount ));
        this.refreshTable();
    }
}
