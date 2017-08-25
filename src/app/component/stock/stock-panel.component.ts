
import { CrudPanelComponent } from "../common/crud-panel.component";
import { Stock } from "../../model/class/stock";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";

/**
 * This class displays a form for CRUD operations on a Stock.
 *
 * Created by mike on 12/6/2016.
 */
@Component(
{
    selector:    'stock-panel',
    templateUrl: './stock-panel.component.html',
    inputs: ['crudFormService', 'crudPanelButtonsService']
})
export class StockPanelComponent extends CrudPanelComponent<Stock>
{
    constructor( protected toaster: ToastsManager )
    {
        super( toaster );
    }
}
