import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { GainsLossesBaseTableComponent } from "./gains-losses-base-table.component";
import { GainsLossesFactory } from '../../model/factory/gains-losses.factory';
import { GainsLossesStateStore } from './gains-losses-state-store';
import { GainsLossesController } from './gains-losses-controller';
import { GainsLossesCrudService } from '../../service/crud/gains-losses-crud.service';
import { GainsLossesCrudActionHandler } from './gains-losses-action-handler';

/**
 * This component displays a list of gains/losses.
 *
 * Created by Mike on 5/29/2018
 */
@Component(
    {
        selector:    'gains-losses-tab-table',
        templateUrl: './gains-losses-table-tab.component.html',
        providers: [GainsLossesStateStore, GainsLossesController, GainsLossesCrudActionHandler]
    } )
export class GainsLossesTableTabComponent extends GainsLossesBaseTableComponent
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {GainsLossesStateStore} gainsLossesStateStore
     * @param {GainsLossesController} gainsLossesController
     * @param {GainsLossesFactory} gainsLossesFactory
     * @param {GainsLossesCrudService} gainsLossesCrudService
     */
    constructor( protected toaster: ToastsManager,
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
