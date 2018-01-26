import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CrudDialogComponent } from "../crud/dialog/crud-dialog.component";
import { Stock } from "../../model/entity/stock";
import { StockCrudServiceContainer } from "./stock-crud-service-container";

/**
 * This class manages the modal dialog that contains the Stock
 * editing fields
 *
 * Created by mike on 11/19/2016.
 */
@Component
({
    selector:    'stock-dialog',
    templateUrl: './stock-dialog.component.html'
})
export class StockDialogComponent extends CrudDialogComponent<Stock>
{
    constructor( protected toaster: ToastsManager,
                 private stockCrudServiceContainer: StockCrudServiceContainer )
    {
        super( toaster, stockCrudServiceContainer );
    }

    /**
     * This method is called when a 409 HTTP Code is received from a rest call.
     */
    public getDuplicateKeyErrorMessage(): string
    {
        return this.modelObject.tickerSymbol + " already exists";
    }

    protected isContinuousAdd(): boolean
    {
        return true;
    }
}
