import { Component } from "@angular/core";
import { CrudFormButtonsComponent } from "../common/crud-form-buttons.component";
import { ToastsManager } from "ng2-toastr";
import { Stock } from "../../model/class/stock";
import { StockCrudService } from "../../service/stock-crud.service";
import { StockFactory } from "../../model/factory/stock.factory";

/**
 * Button panel component for the Stock dialog.
 *
 * Created by mike on 12/31/2016.
 */
@Component({
    selector:    'stock-form-buttons',
    templateUrl: '../common/crud-form-buttons.component.html',
    inputs:      ['crudFormService', 'crudButtonsService', 'crudDialogService']
})
export class StockFormButtonsComponent extends CrudFormButtonsComponent<Stock>
{
    constructor( protected toaster: ToastsManager,
                 protected stockFactory: StockFactory,
                 protected stockCrudService: StockCrudService )
    {
        super( toaster, stockFactory, stockCrudService );
    }

    /**
     * Display the Ticker Symbol to confirm delete
     * @return {string}
     */
    public getDeleteKey(): string
    {
        return this.modelObject.tickerSymbol;
    }
}
