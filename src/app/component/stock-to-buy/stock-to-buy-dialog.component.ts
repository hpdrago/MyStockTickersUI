import { CrudDialogComponent } from "../crud/dialog/crud-dialog.component";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockToBuy } from "../../model/entity/stock-to-buy";
import { StockToBuyStateStore } from './stock-to-buy-state-store';
import { StockToBuyFactory } from '../../model/factory/stock-to-buy.factory';
import { StockToBuyController } from './stock-to-buy-controller';
import { StockToBuyCrudService } from '../../service/crud/stock-to-buy-crud.service';

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector: 'stock-to-buy-dialog',
    templateUrl: './stock-to-buy-dialog.component.html'
})
export class StockToBuyDialogComponent extends CrudDialogComponent<StockToBuy>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockToBuyStateStore} stockToBuyStateStore
     * @param {StockToBuyController} stockToBuyController
     * @param {StockToBuyFactory} stockToBuyFactory
     * @param {StockToBuyCrudService} stockToBuyCrudService
     */
    constructor( protected toaster: ToastsManager,
                 private stockToBuyStateStore: StockToBuyStateStore,
                 private stockToBuyController: StockToBuyController,
                 private stockToBuyFactory: StockToBuyFactory,
                 private stockToBuyCrudService: StockToBuyCrudService )
    {
        super( toaster,
               stockToBuyStateStore,
               stockToBuyController,
               stockToBuyFactory,
               stockToBuyCrudService );
    }
}
