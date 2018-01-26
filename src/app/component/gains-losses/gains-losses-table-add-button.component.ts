import { CrudTableAddButtonComponent } from '../crud/table/crud-table-add-button.component';
import { GainsLosses } from '../../model/entity/gains-losses';
import { Component } from '@angular/core';
import { SessionService } from '../../service/session.service';
import { ToastsManager } from 'ng2-toastr';
import { GainsLossesStateStore } from './gains-losses-state-store';
import { GainsLossesController } from './gains-losses-controller';
import { GainsLossesFactory } from '../../model/factory/gains-losses.factory';
import { GainsLossesCrudService } from '../../service/crud/gains-losses-crud.service';

@Component
({
     selector: 'gains-losses-table-add-button',
     templateUrl: '../crud/table/crud-table-button.component.html'
 })
export class GainsLossesTableAddButtonComponent extends CrudTableAddButtonComponent<GainsLosses>
{
    /**
     * Constructor.
     * @param {SessionService} session
     * @param {GainsLossesStateStore} gainsLossesStateStore
     * @param {GainsLossesController} gainsLossesController
     * @param {GainsLossesFactory} gainsLossesFactory
     * @param {GainsLossesCrudService} gainsLossesCrudService
     * @param {ToastsManager} toaster
     */
    constructor( protected session: SessionService,
                 protected toaster: ToastsManager,
                 protected gainsLossesStateStore: GainsLossesStateStore,
                 protected gainsLossesController: GainsLossesController,
                 protected gainsLossesFactory: GainsLossesFactory,
                 protected gainsLossesCrudService: GainsLossesCrudService )
    {
        super( toaster,
               gainsLossesStateStore,
               gainsLossesController,
               gainsLossesFactory,
               gainsLossesCrudService );
    }
}
