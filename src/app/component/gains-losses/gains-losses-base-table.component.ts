import { ToastsManager } from "ng2-toastr";
import { TableLoadingStrategy } from '../common/table-loading-strategy';
import { GainsLossesStateStore } from './gains-losses-state-store';
import { GainsLossesController } from './gains-losses-controller';
import { GainsLosses } from '../../model/entity/gains-losses';
import { GainsLossesFactory } from '../../model/factory/gains-losses.factory';
import { GainsLossesCrudService } from '../../service/crud/gains-losses-crud.service';
import { StockModelObjectTableComponent } from '../common/stock-model-object-table-component';
import { CookieService } from 'ngx-cookie-service';
import { ChangeDetectorRef } from '@angular/core';

/**
 * This component displays a list of Stocks to buy.
 *
 * Created by mike on 10/24/2017.
 */
export abstract class GainsLossesBaseTableComponent extends StockModelObjectTableComponent<GainsLosses>
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
    protected constructor( protected changeDetector: ChangeDetectorRef,
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
