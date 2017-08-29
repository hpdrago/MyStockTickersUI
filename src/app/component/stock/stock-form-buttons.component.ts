import { Component } from "@angular/core";
import { CrudFormButtonsComponent } from "../common/crud-form-buttons.component";
import { ToastsManager } from "ng2-toastr";
import { Stock } from "../../model/class/stock";
import { StockCrudService } from "../../service/stock-crud.service";
import { StockFactory } from "../../model/factory/stock.factory";
import { StockFormService } from "./stock-form.service";
import { StockFormButtonsService } from "./stock-form-buttons.service";
import { StockDialogService } from "./stock-dialog.service";

/**
 * Button panel component for the Stock dialog.
 *
 * Created by mike on 12/31/2016.
 */
@Component({
    selector:    'stock-form-buttons',
    templateUrl: '../common/crud-form-buttons.component.html'
})
export class StockFormButtonsComponent extends CrudFormButtonsComponent<Stock>
{
    constructor( protected toaster: ToastsManager,
                 protected stockFactory: StockFactory,
                 protected stockCrudService: StockCrudService,
                 protected stockFormService: StockFormService,
                 protected stockFormButtonsService: StockFormButtonsService,
                 protected stockDialogService: StockDialogService )
    {
        super( toaster, stockFactory, stockCrudService, stockFormService, stockFormButtonsService, stockDialogService );
        if ( !this.toaster )
        {
            throw new Error( "modelObjectFactory argument cannot be null" );
        }
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
