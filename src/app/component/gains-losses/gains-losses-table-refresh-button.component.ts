/**
 * Created by mike on 3/10/2018
 */
import { GainsLosses } from '../../model/entity/gains-losses';
import { Component } from '@angular/core';
import { GainsLossesCrudService } from '../../service/crud/gains-losses-crud.service';
import { GainsLossesFactory } from '../../model/factory/gains-losses.factory';
import { GainsLossesController } from './gains-losses-controller';
import { GainsLossesStateStore } from './gains-losses-state-store';
import { SessionService } from '../../service/session.service';
import { ToastsManager } from 'ng2-toastr';
import { CrudTableRefreshButtonComponent } from '../crud/table/crud-table-refresh-button.component';

@Component
({
     selector: 'gains-losses-table-refresh-button',
     templateUrl: '../crud/table/crud-table-button.component.html'
 })
export class GainsLossesTableRefreshButtonComponent extends CrudTableRefreshButtonComponent<GainsLosses>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {SessionService} session
     * @param {GainsLossesStateStore} gainsLossesStateStore
     * @param {GainsLossesController} gainsLossesController
     * @param {GainsLossesFactory} gainsLossesFactory
     * @param {GainsLossesCrudService} gainsLossesCrudService
     */
    constructor( protected toaster: ToastsManager,
                 private session: SessionService,
                 private gainsLossesStateStore: GainsLossesStateStore,
                 private gainsLossesController: GainsLossesController,
                 private gainsLossesFactory: GainsLossesFactory,
                 private gainsLossesCrudService: GainsLossesCrudService )
    {
        super( toaster,
               gainsLossesStateStore,
               gainsLossesController,
               gainsLossesFactory,
               gainsLossesCrudService );
    }
}
