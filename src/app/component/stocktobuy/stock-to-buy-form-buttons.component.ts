import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockToBuyCrudServiceContainer } from "./stock-to-buy-crud-service-container";
import { CrudFormButtonsComponent } from "../crud/form/crud-form-buttons.component";
import { StockToBuy } from "../../model/entity/stock-to-buy";

/**
 * Button panel component for the StockToBuy dialog.
 *
 * Created by mike on 8/15/2017.
 */
@Component({
    selector:    'stock-to-buy-form-buttons',
    templateUrl: '../crud/form/crud-form-buttons.component.html',
    styleUrls: ['../crud/form/crud-form-buttons.component.css']
})
export class StockToBuyFormButtonsComponent extends CrudFormButtonsComponent<StockToBuy>
{
    constructor( protected toaster: ToastsManager,
                 private stockToBuyServiceContainer: StockToBuyCrudServiceContainer )
    {
        super( toaster, stockToBuyServiceContainer );
    }

    /**
     * Defines the message to display to the user in the dialog when deleting the model object
     */
    public getDeleteMessage(): string
    {
        return 'Are you sure you want to delete?';
    }

    /**
     * @return {undefined}
     */
    public getDeleteKeyword(): string
    {
        return 'Stock ToBuy'
    }
}
