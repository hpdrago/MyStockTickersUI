import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockCatalystEventCrudServiceContainer } from "./stock-catalyst-event-crud-service-container";
import { CrudTableButtonsComponent } from "../crud/table/crud-table-buttons.component";
import { StockCatalystEvent } from "../../model/entity/stock-catalyst-event";

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector:    'stock-catalyst-event-table-buttons',
    styleUrls:   ['../crud/table/crud-table-buttons.component.css'],
    templateUrl: '../crud/table/crud-table-buttons.component.html'
})
export class StockCatalystEventTableButtonsComponent extends CrudTableButtonsComponent<StockCatalystEvent>
{
    constructor( protected toaster: ToastsManager,
                 protected stockNotesServiceContainer: StockCatalystEventCrudServiceContainer )
    {
        super( toaster, stockNotesServiceContainer );
    }


    protected getAddButtonLabel(): string
    {
        return "Add Event";
    }

    protected getDeleteButtonLabel(): string
    {
        return "Delete Event";
    }

}
