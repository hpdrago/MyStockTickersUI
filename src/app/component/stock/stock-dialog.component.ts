import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CrudDialogComponent } from "../common/crud-dialog.component";
import { Stock } from "../../model/class/stock";

/**
 * This class manages the modal dialog that contains the Stock
 * editing fields
 *
 * Created by mike on 11/19/2016.
 */
@Component
({
    selector:    'stock-dialog',
    templateUrl: './stock-dialog.component.html',
    inputs:      ['crudDialogService', 'crudFormService', 'crudPanelButtonsService']
})
export class StockDialogComponent extends CrudDialogComponent<Stock>
{
    constructor( protected toaster: ToastsManager )
    {
        super( toaster );
    }

    /**
     * This method is called when a 409 HTTP Code is received from a rest call.
     */
    protected getDuplicateKeyErrorMessage(): string
    {
        return this.modelObject.tickerSymbol + " already exists";
    }

    protected isContinuousAdd(): boolean
    {
        return true;
    }
}
