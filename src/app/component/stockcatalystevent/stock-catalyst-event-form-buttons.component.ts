import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockCatalystEventCrudServiceContainer } from "./stock-catalyst-event-crud-service-container";
import { CrudFormButtonsComponent } from "../crud/form/crud-form-buttons.component";
import { StockCatalystEvent } from "../../model/entity/stock-catalyst-event";

/**
 * Button panel component for the StockAnalytics dialog.
 *
 * Created by mike on 8/15/2017.
 */
@Component({
    selector:    'stock-catalyst-event-form-buttons',
    templateUrl: '../crud/form/crud-form-buttons.component.html',
    styleUrls: ['../crud/form/crud-form-buttons.component.css']
})
export class StockCatalystEventFormButtonsComponent extends CrudFormButtonsComponent<StockCatalystEvent>
{
    constructor( protected toaster: ToastsManager,
                 private stockNotesServiceContainer: StockCatalystEventCrudServiceContainer )
    {
        super( toaster, stockNotesServiceContainer );
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
        return 'Stock Catalyst Event'
    }
}
