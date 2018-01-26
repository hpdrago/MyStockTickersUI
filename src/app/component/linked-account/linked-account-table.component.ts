import { CrudTableComponent } from "../crud/table/crud-table.component";
import { LinkedAccount } from "../../model/entity/linked-account";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { LinkedAccountCrudServiceContainer } from "./linked-account-crud-service-container";
import { TableLoadingStrategy } from "../common/table-loading-strategy";
import { TradeItAccount } from "../../model/entity/tradeit-account";

/**
 * This table displays all of the linked account for a TradeItAccount instance.
 */
@Component(
{
    selector:    'linked-account-table',
    styleUrls:   ['../crud/table/crud-table.component.css'],
    templateUrl: './linked-account-table.component.html'
} )
export class LinkedAccountTableComponent extends CrudTableComponent<LinkedAccount>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {LinkedAccountCrudServiceContainer} linkedAccountCrudServiceContainer
     */
    constructor( protected toaster: ToastsManager,
                 protected linkedAccountCrudServiceContainer: LinkedAccountCrudServiceContainer )
    {
        super( TableLoadingStrategy.ALL_ON_DEMAND, toaster, linkedAccountCrudServiceContainer );
    }

    /**
     * You can't add a linked account, the accounts are identified through the authentication process.
     * @returns false.
     */
    protected isAllowAdds(): boolean
    {
        return false;
    }

    /**
     * Can't update a linked account either.
     * @returns false.
     */
    protected isAllowUpdates(): boolean
    {
        return false;
    }

    /**
     * This method is called when the user clicks on a {@code TradeItAccount} in the left hand table.  This method
     * will load the linked accounts related to the {@code TradeItAccount}.
     * @param {TradeItAccount} tradeItAccount
     */
    public loadAccounts( tradeItAccount: TradeItAccount )
    {
        this.rows = tradeItAccount.linkedAccounts;
    }
}
