import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CrudTableButtonsComponent } from "../crud/table/crud-table-buttons.component";
import { StockCatalystEvent } from "../../model/entity/stock-catalyst-event";
import { StockCatalystEventController } from './stock-catalyst-event-controller';
import { StockCatalystEventStateStore } from './stock-catalyst-event-state-store';
import { StockCatalystEventFactory } from '../../model/factory/stock-catalyst-event.factory';

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
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockCatalystEventStateStore} stockCatalystEventStateStore
     * @param {StockCatalystEventController} stockCatalystEventController
     * @param {StockCatalystEventFactory} stockCatalystEventFactory
     */
    constructor( protected toaster: ToastsManager,
                 private stockCatalystEventStateStore: StockCatalystEventStateStore,
                 private stockCatalystEventController: StockCatalystEventController,
                 private stockCatalystEventFactory: StockCatalystEventFactory )
    {
        super( toaster,
               stockCatalystEventStateStore,
               stockCatalystEventController,
               stockCatalystEventFactory );
               
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
