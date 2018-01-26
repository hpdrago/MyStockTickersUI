import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { TradeItAccountCrudServiceContainer } from "./tradeit-account-crud-service-container";
import { CrudTableButtonsComponent } from "../crud/table/crud-table-buttons.component";
import { TradeItAccount } from "../../model/entity/tradeit-account";

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector:    'tradeit-account-table-buttons',
    styleUrls:   ['../crud/table/crud-table-buttons.component.css'],
    templateUrl: '../crud/table/crud-table-buttons.component.html'
})
export class TradeItAccountTableButtonsComponent extends CrudTableButtonsComponent<TradeItAccount>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {TradeItAccountCrudServiceContainer} customerAccountServiceContainer
     */
    constructor( protected toaster: ToastsManager,
                 protected customerAccountServiceContainer: TradeItAccountCrudServiceContainer )
    {
        super( toaster, customerAccountServiceContainer );
    }

    protected getAddButtonLabel(): string
    {
        return "Add Account";
    }

    protected getDeleteButtonLabel(): string
    {
        return "Delete Account";
    }

}
