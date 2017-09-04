import { Component } from "@angular/core";
import { CrudFormButtonsComponent } from "../crud/form/crud-form-buttons.component";
import { ToastsManager } from "ng2-toastr";
import { Stock } from "../../model/entity/stock";
import { StockCrudServiceContainer } from "./stock-crud-service-container";

/**
 * Button panel component for the Stock dialog.
 *
 * Created by mike on 12/31/2016.
 */
@Component({
    selector:    'stock-form-buttons',
    templateUrl: '../crud/form/crud-form-buttons.component.html'
})
export class StockFormButtonsComponent extends CrudFormButtonsComponent<Stock>
{
    constructor( protected toaster: ToastsManager,
                 private stockCrudServiceContainer: StockCrudServiceContainer )
    {
        super( toaster, stockCrudServiceContainer );
    }

    /**
     * Display the Ticker Symbol to confirm delete
     * @return {string}
     */
    public getDeleteKeyword(): string
    {
        return this.modelObject.tickerSymbol;
    }
}
