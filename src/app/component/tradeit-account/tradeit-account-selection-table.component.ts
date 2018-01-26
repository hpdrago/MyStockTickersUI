import { Component } from "@angular/core";
import { TradeItAccount } from "../../model/entity/tradeit-account";
import { ToastsManager } from "ng2-toastr";
import { TradeItService } from "../../service/tradeit/tradeit.service";
import { TradeItAccountCrudServiceContainer } from "./tradeit-account-crud-service-container";
import { TradeitAccountBaseTableComponent } from "./tradeit-account-base-table.component";
import { TradeitAccountOAuthService } from "./tradeit-account-oauth.service";
import { TradeItErrorReporter } from "../tradeit/tradeit-error-reporter";


/**
 * This component list accounts vertically.
 *
 * Created by mike on 1/9/2018.
 */
@Component({
               selector: 'tradeit-account-selection-table',
               templateUrl: './tradeit-account-selection-table.component.html',
               styleUrls: ['./tradeit-account-selection-table.component.css']
           })
export class TradeItAccountSelectionTableComponent extends TradeitAccountBaseTableComponent
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {TradeItErrorReporter} tradeItErrorReporter
     * @param {TradeItAccountCrudServiceContainer} tradeItAccountCrudServiceContainer
     * @param {TradeItService} tradeItService
     * @param {TradeitAccountOAuthService} tradeItOAuthService
     */
    constructor( protected toaster: ToastsManager,
                 protected tradeItErrorReporter: TradeItErrorReporter,
                 protected tradeItAccountCrudServiceContainer: TradeItAccountCrudServiceContainer,
                 protected tradeItService: TradeItService,
                 protected tradeItOAuthService: TradeitAccountOAuthService )
    {
        super( toaster, tradeItErrorReporter, tradeItAccountCrudServiceContainer, tradeItService,
               tradeItOAuthService ) ;
    }

    /**
     * Used to determine if the row if the current row should be selected.
     * @param {TradeItAccount} customerAccount
     * @returns {boolean}
     */
    protected isSelectedCustomerAccount( customerAccount: TradeItAccount ): boolean
    {
        return this.modelObject != null && this.modelObject.id === customerAccount.id;
    }

    protected onTableLoad( modelObjects: TradeItAccount[] ): void
    {
        this.log( JSON.stringify( modelObjects ));
        super.onTableLoad( modelObjects );
    }

}
