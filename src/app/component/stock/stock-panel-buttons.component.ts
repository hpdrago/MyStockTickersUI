import { Component } from "@angular/core";
import { CrudPanelButtonsComponent } from "../common/crud-panel-buttons.component";
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
    selector: 'stock-panel-buttons',
    templateUrl: '../common/crud-panel-buttons.component.html',
    inputs: ['crudFormService', 'crudPanelButtonsService', 'crudDialogService']
})
export class StockPanelButtonsComponent extends CrudPanelButtonsComponent<Stock>
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
