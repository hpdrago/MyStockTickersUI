import { ToastsManager } from "ng2-toastr";
import { Component } from "@angular/core";
import { TradeitAccountBaseTableComponent } from "./tradeit-account-base-table.component";
import { TradeItService } from "../../service/tradeit/tradeit.service";
import { TradeitAccountOAuthService } from "./tradeit-account-oauth.service";
import { TradeItErrorReporter } from "../tradeit/tradeit-error-reporter";
import { TradeItAccountFactory } from '../../model/factory/tradeit-account.factory';
import { TradeItAccountController } from './tradeit-controller';
import { TradeItAccountStateStore } from './tradeit-account-state-store';
import { TradeItAccountCrudService } from '../../service/crud/tradeit-account-crud.service';

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
export class TradeItAccountTableComponent extends TradeitAccountBaseTableComponent
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
     * @param {TradeitAccountOAuthService} tradeItOAuthService
     */
    constructor( protected toaster: ToastsManager,
                 protected tradeItErrorReporter: TradeItErrorReporter,
                 protected tradeItAccountStateStore: TradeItAccountStateStore,
                 protected tradeItAccountController: TradeItAccountController,
                 protected tradeItAccountFactory: TradeItAccountFactory,
                 protected tradeItAccountCrudService: TradeItAccountCrudService,
                 protected tradeItService: TradeItService,
                 protected tradeItOAuthService: TradeitAccountOAuthService )
    {
        super( toaster,
               tradeItErrorReporter,
               tradeItAccountStateStore,
               tradeItAccountController,
               tradeItAccountFactory,
               tradeItAccountCrudService,
               tradeItService,
               tradeItOAuthService );
    }
}
