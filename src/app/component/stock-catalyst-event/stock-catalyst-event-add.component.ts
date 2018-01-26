import { BaseComponent } from '../common/base.component';
import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { StockCatalystEventController } from './stock-catalyst-event-controller';
import { StockCatalystEventCrudService } from '../../service/crud/stock-catalyst-event-crud.service';
import { StockCatalystEventCrudActionHandler } from './stock-catalyst-event-crud-action-handler.service';

/**
 * Component to display the stock notes dialog to create a new note.
 */
@Component
({
    template: `<stock-catalyst-event-dialog [modal]="false"
                                            [showContinuousAddButton]="true"
                                            [showAddButton]="false"
                                            [showCloseButton]="false">
               </stock-catalyst-event-dialog>`
 })
export class StockCatalystEventAddComponent extends BaseComponent implements OnInit
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockCatalystEventController} stockCatalystEventController
     * @param {StockCatalystEventCrudActionHandler} stockCatalystEventActionHandler
     * @param {StockCatalystEventCrudService} stockCatalystEventCrudService
     */
    public constructor( protected toaster: ToastsManager,
                        private stockCatalystEventController: StockCatalystEventController,
                        private stockCatalystEventActionHandler: StockCatalystEventCrudActionHandler,
                        private stockCatalystEventCrudService: StockCatalystEventCrudService )
    {
        super( toaster );
    }

    public ngOnInit(): void
    {
        this.stockCatalystEventController
            .sendTableAddButtonClickedEvent();
    }
}
