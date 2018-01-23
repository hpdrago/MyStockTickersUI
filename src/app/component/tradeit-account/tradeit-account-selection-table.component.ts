import { Component, EventEmitter, Output } from "@angular/core";
import { TradeItAccount } from "../../model/entity/tradeit-account";
import { ToastsManager } from "ng2-toastr";
import { TradeItService } from "../../service/tradeit/tradeit.service";
import { TradeItAccountCrudServiceContainer } from "./tradeit-account-crud-service-container";
import { TradeitAccountBaseTableComponent } from "./tradeit-account-base-table.component";


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
     * Constructor
     * @param {ToastsManager} toaster
     * @param {TradeitAccountCrudServiceContainer} tradeItAccountCrudServiceContainer
     * @param {TradeItService} tradeItService
     */
    constructor( protected toaster: ToastsManager,
                 protected tradeItAccountCrudServiceContainer: TradeItAccountCrudServiceContainer,
                 protected tradeItService: TradeItService )
    {
        super( toaster, tradeItAccountCrudServiceContainer, tradeItService ) ;
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
