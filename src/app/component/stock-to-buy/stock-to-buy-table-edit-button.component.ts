/**
 * Created by mike on 3/10/2018
 */
import { StockToBuy } from '../../model/entity/stock-to-buy';
import { ChangeDetectorRef, Component } from '@angular/core';
import { StockToBuyCrudService } from '../../service/crud/stock-to-buy-crud.service';
import { StockToBuyFactory } from '../../model/factory/stock-to-buy.factory';
import { SessionService } from '../../service/session.service';
import { ToastsManager } from 'ng2-toastr';
import { CrudTableEditButtonComponent } from '../crud/table/crud-table-edit-button.component';
import { StockToBuyStateStore } from '../stock-to-buy/stock-to-buy-state-store';
import { StockToBuyController } from '../stock-to-buy/stock-to-buy-controller';

@Component
({
     selector: 'stock-to-buy-table-edit-button',
     templateUrl: '../crud/table/crud-table-button.component.html'
 })
export class StockToBuyTableEditButtonComponent extends CrudTableEditButtonComponent<StockToBuy>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {SessionService} session
     * @param {StockToBuyStateStore} stockToBuyStateStore
     * @param {StockToBuyController} stockToBuyController
     * @param {StockToBuyFactory} stockToBuyFactory
     * @param {StockToBuyCrudService} stockToBuyCrudService
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected toaster: ToastsManager,
                 private session: SessionService,
                 private stockToBuyStateStore: StockToBuyStateStore,
                 private stockToBuyController: StockToBuyController,
                 private stockToBuyFactory: StockToBuyFactory,
                 private stockToBuyCrudService: StockToBuyCrudService )
    {
        super( changeDetector,
               toaster,
               stockToBuyStateStore,
               stockToBuyController,
               stockToBuyFactory,
               stockToBuyCrudService );
    }
}
