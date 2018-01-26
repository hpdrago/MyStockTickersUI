import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CrudTableButtonsComponent } from "../crud/table/crud-table-buttons.component";
import { LinkedAccount } from "../../model/entity/linked-account";
import { LinkedAccountCrudServiceContainer } from "./linked-account-crud-service-container";
import { CrudRestErrorReporter } from "../../service/crud/crud-rest-error-reporter";

/**
 * The buttons component for the linked accounts.
 * Created by mike on 1/19/2018
 */
@Component({
    selector:    'linked-account-table-buttons',
    styleUrls:   ['../crud/table/crud-table-buttons.component.css'],
    templateUrl: '../crud/table/crud-table-buttons.component.html'
})
export class LinkedAccountTableButtonsComponent extends CrudTableButtonsComponent<LinkedAccount>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {CrudRestErrorReporter} crudRestErrorReporter
     * @param {LinkedAccountCrudServiceContainer} linkedAccountServiceContainer
     */
    constructor( protected toaster: ToastsManager,
                 protected linkedAccountServiceContainer: LinkedAccountCrudServiceContainer )
    {
        super( toaster, linkedAccountServiceContainer );
    }

    protected isShowAddButton(): boolean
    {
        return false;
    }

    protected getDeleteButtonLabel(): string
    {
        return "Delete Account";
    }

}
