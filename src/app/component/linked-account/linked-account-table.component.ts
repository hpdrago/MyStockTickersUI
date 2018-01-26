import { CrudTableComponent } from "../crud/table/crud-table.component";
import { LinkedAccount } from "../../model/entity/linked-account";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { TableLoadingStrategy } from "../common/table-loading-strategy";
import { TradeItAccount } from "../../model/entity/tradeit-account";
import { LinkedAccountFactory } from '../../model/factory/linked-account.factory';
import { LinkedAccountController } from './linked-account-controller';
import { LinkedAccountCrudService } from '../../service/crud/linked-account-crud.service';
import { LinkedAccountStateStore } from './linked-account-state-store';

/**
 * This table displays all of the linked account for a TradeItAccount instance.
 */
@Component(
{
    selector:    'linked-account-table',
    styleUrls:   ['../crud/table/crud-table.component.css'],
    templateUrl: './linked-account-table.component.html',
    providers: [LinkedAccountStateStore, LinkedAccountController]
} )
export class LinkedAccountTableComponent extends CrudTableComponent<LinkedAccount>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {LinkedAccountStateStore} linkedAccountStateStore
     * @param {LinkedAccountController} linkedAccountController
     * @param {LinkedAccountFactory} linkedAccountFactory
     * @param {LinkedAccountCrudService} linkedAccountCrudService
     */
    constructor( protected toaster: ToastsManager,
                 protected linkedAccountStateStore: LinkedAccountStateStore,
                 protected linkedAccountController: LinkedAccountController,
                 protected linkedAccountFactory: LinkedAccountFactory,
                 protected linkedAccountCrudService: LinkedAccountCrudService )
    {
        super( TableLoadingStrategy.ALL_ON_DEMAND,
               toaster,
               linkedAccountStateStore,
               linkedAccountController,
               linkedAccountFactory,
               linkedAccountCrudService );
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
        let methodName = "loadAccounts";
        this.log( methodName + ".begin " + JSON.stringify( tradeItAccount ));
        this.rows = tradeItAccount.linkedAccounts;
        this.log( methodName + ".end" );
    }
}
