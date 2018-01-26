import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CrudFormButtonsComponent } from "../crud/form/crud-form-buttons.component";
import { StockCatalystEvent } from "../../model/entity/stock-catalyst-event";
import { StockCatalystEventController } from './stock-catalyst-event-controller';
import { StockCatalystEventStateStore } from './stock-catalyst-event-state-store';
import { StockCatalystEventFactory } from '../../model/factory/stock-catalyst-event.factory';
import { StockCatalystEventCrudService } from '../../service/crud/stock-catalyst-event-crud.service';

/**
 * Button panel component for the StockAnalystConsensus dialog.
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
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockCatalystEventStateStore} stockCatalystEventStateStore
     * @param {StockCatalystEventController} stockCatalystEventController
     * @param {StockCatalystEventFactory} stockCatalystEventFactory
     * @param {StockCatalystEventCrudService} stockCatalystEventCrudService
     */
    constructor( protected toaster: ToastsManager,
                 private stockCatalystEventStateStore: StockCatalystEventStateStore,
                 private stockCatalystEventController: StockCatalystEventController,
                 private stockCatalystEventFactory: StockCatalystEventFactory,
                 private stockCatalystEventCrudService: StockCatalystEventCrudService )
    {
        super( toaster,
               stockCatalystEventStateStore,
               stockCatalystEventController,
               stockCatalystEventFactory,
               stockCatalystEventCrudService );
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
