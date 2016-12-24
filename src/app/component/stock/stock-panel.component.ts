
import { CrudPanelComponent } from "../common/crud-panel.component";
import { Stock } from "../../model/stock";
import { Component } from "@angular/core";
import { StockFactory } from "../../model/stock-factory";
import { StockFormService } from "./stock-form.service";
import { StockCrudService } from "../../service/stock-crud.service";
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
    inputs: ['crudPanelService'],
    outputs: ['closeButtonClick', 'modelObjectUpdated', 'modelObjectDeleted', 'modelObjectCreated',
              'jumpToModelObject']
})
export class StockPanelComponent extends CrudPanelComponent<Stock>
{
    constructor( protected toaster: ToastsManager,
                 protected stockFormService: StockFormService,
                 protected stockService: StockCrudService,
                 protected stockFactory: StockFactory )
    {
        super( toaster, stockFormService, stockService, stockFactory );
    }
}