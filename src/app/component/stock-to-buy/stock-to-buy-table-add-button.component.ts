import { CrudTableAddButtonComponent } from '../crud/table/crud-table-add-button.component';
import { StockToBuy } from '../../model/entity/stock-to-buy';
import { Component } from '@angular/core';
import { SessionService } from '../../service/session.service';
import { ToastsManager } from 'ng2-toastr';
import { StockToBuyStateStore } from './stock-to-buy-state-store';
import { StockToBuyController } from './stock-to-buy-controller';
import { StockToBuyFactory } from '../../model/factory/stock-to-buy.factory';
import { StockToBuyCrudService } from '../../service/crud/stock-to-buy-crud.service';

@Component
({
     selector: 'stock-to-buy-table-add-button',
     templateUrl: '../crud/table/crud-table-button.component.html'
 })
export class StockToBuyTableAddButtonComponent extends CrudTableAddButtonComponent<StockToBuy>
{
    /**
     * Constructor.
     * @param {SessionService} session
     * @param {StockToBuyStateStore} stockToBuyStateStore
     * @param {StockToBuyController} stockToBuyController
     * @param {StockToBuyFactory} stockToBuyFactory
     * @param {StockToBuyCrudService} stockToBuyCrudService
     * @param {ToastsManager} toaster
     */
    constructor( protected session: SessionService,
                 protected toaster: ToastsManager,
                 protected stockToBuyStateStore: StockToBuyStateStore,
                 protected stockToBuyController: StockToBuyController,
                 protected stockToBuyFactory: StockToBuyFactory,
                 protected stockToBuyCrudService: StockToBuyCrudService )
    {
        super( toaster,
               stockToBuyStateStore,
               stockToBuyController,
               stockToBuyFactory,
               stockToBuyCrudService );
    }
}
