import { CrudDialogComponent } from "../crud/dialog/crud-dialog.component";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockCatalystEvent } from "../../model/entity/stock-catalyst-event";
import { StockCatalystEventFactory } from '../../model/factory/stock-catalyst-event.factory';
import { StockCatalystEventController } from './stock-catalyst-event-controller';
import { StockCatalystEventStateStore } from './stock-catalyst-event-state-store';

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector: 'stock-catalyst-event-dialog',
    templateUrl: './stock-catalyst-event-dialog.component.html'
})
export class StockCatalystEventDialogComponent extends CrudDialogComponent<StockCatalystEvent>
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
}
