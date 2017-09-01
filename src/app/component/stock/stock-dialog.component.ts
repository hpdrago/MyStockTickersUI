import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CrudDialogComponent } from "../crud/dialog/crud-dialog.component";
import { Stock } from "../../model/entity/stock";
import { StockFormService } from "./stock-form.service";
import { StockFormButtonsService } from "./stock-form-buttons.service";
import { StockDialogService } from "./stock-dialog.service";

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
                 protected stockDialogService: StockDialogService,
                 protected stockFormService: StockFormService,
                 protected stockFormButtonsService: StockFormButtonsService )
    {
        super( toaster, stockDialogService, stockFormService, stockFormButtonsService, false );
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
