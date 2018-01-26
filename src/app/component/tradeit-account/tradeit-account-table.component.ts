import { ToastsManager } from "ng2-toastr";
import { TradeItAccountCrudServiceContainer } from "./tradeit-account-crud-service-container";
import { Component } from "@angular/core";
import { TradeitAccountBaseTableComponent } from "./tradeit-account-base-table.component";
import { TradeItService } from "../../service/tradeit/tradeit.service";
import { TradeitAccountOAuthService } from "./tradeit-account-oauth.service";
import { TradeItErrorReporter } from "../tradeit/tradeit-error-reporter";

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
     * @param {TradeItAccountCrudServiceContainer} customerAccountServiceContainer
     * @param {TradeItService} tradeItService
     * @param {TradeitAccountOAuthService} tradeItOAuthService
     */
    constructor( protected toaster: ToastsManager,
                 protected tradeItErrorReporter: TradeItErrorReporter,
                 protected customerAccountServiceContainer: TradeItAccountCrudServiceContainer,
                 protected tradeItService: TradeItService,
                 protected tradeItOAuthService: TradeitAccountOAuthService )
    {
        super( toaster, tradeItErrorReporter, customerAccountServiceContainer, tradeItService, tradeItOAuthService );
    }
}
