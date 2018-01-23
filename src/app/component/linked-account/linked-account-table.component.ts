import { CrudTableComponent } from "../crud/table/crud-table.component";
import { LinkedAccount } from "../../model/entity/linked-account";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { TradeItService } from "../../service/tradeit/tradeit.service";
import { LinkedAccountCrudServiceContainer } from "./linked-account-crud-service-container";
import { TableLoadingStrategy } from "../common/table-loading-strategy";

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
    constructor( protected toaster: ToastsManager,
                 protected linkedAccountCrudServiceContainer: LinkedAccountCrudServiceContainer,
                 private tradeItService: TradeItService )
    {
        super( TableLoadingStrategy.FULL_ON_DEMAND, toaster, linkedAccountCrudServiceContainer );
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
}
