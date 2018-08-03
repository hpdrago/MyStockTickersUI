import { ChangeDetectorRef, Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { GainsLossesFactory } from '../../model/factory/gains-losses.factory';
import { GainsLossesStateStore } from './gains-losses-state-store';
import { GainsLossesController } from './gains-losses-controller';
import { GainsLossesCrudService } from '../../service/crud/gains-losses-crud.service';
import { CookieService } from 'ngx-cookie-service';
import { StockModelObjectTableComponent } from '../common/stock-model-object-table-component';
import { GainsLosses } from '../../model/entity/gains-losses';
import { TableLoadingStrategy } from '../common/table-loading-strategy';

/**
 * This component displays a list of gains/losses.
 *
 * Created by Mike on 5/29/2018
 */
@Component(
    {
        selector:    'gains-losses-table',
        templateUrl: './gains-losses-table.component.html'
    } )
export class GainsLossesTableComponent extends StockModelObjectTableComponent<GainsLosses>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {GainsLossesStateStore} gainsLossesStateStore
     * @param {GainsLossesController} gainsLossesController
     * @param {GainsLossesFactory} gainsLossesFactory
     * @param {GainsLossesCrudService} gainsLossesCrudService
     * @param {CookieService} cookieService
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected toaster: ToastsManager,
                 protected gainsLossesStateStore: GainsLossesStateStore,
                 protected gainsLossesController: GainsLossesController,
                 protected gainsLossesFactory: GainsLossesFactory,
                 protected gainsLossesCrudService: GainsLossesCrudService,
                 protected cookieService: CookieService )
    {
        super( changeDetector,
               TableLoadingStrategy.LAZY_ON_CREATE,
               toaster,
               gainsLossesStateStore,
               gainsLossesController,
               gainsLossesFactory,
               gainsLossesCrudService,
               cookieService );
    }
}
