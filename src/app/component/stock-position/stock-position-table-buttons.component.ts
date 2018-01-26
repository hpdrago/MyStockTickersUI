import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CrudTableButtonsComponent } from "../crud/table/crud-table-buttons.component";
import { StockPosition } from '../../model/entity/stock-position';
import { StockPositionStateStore } from './stock-position-state-store';
import { StockPositionController } from './stock-position-controller';
import { StockPositionFactory } from '../../model/factory/stock-position-factory';
import { StockPositionCrudService } from '../../service/crud/stock-position-crud.service';

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector:    'stock-position-table-buttons',
    templateUrl: '../crud/table/crud-table-buttons.component.html'
})
export class StockPositionTableButtonsComponent extends CrudTableButtonsComponent<StockPosition>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockPositionStateStore} stockPositionStateStore
     * @param {StockPositionController} stockPositionController
     * @param {StockPositionFactory} stockPositionFactory
     * @param {StockPositionCrudService} stockPositionCrudService
     */
    constructor( protected toaster: ToastsManager,
                 private stockPositionStateStore: StockPositionStateStore,
                 private stockPositionController: StockPositionController,
                 private stockPositionFactory: StockPositionFactory,
                 private stockPositionCrudService: StockPositionCrudService )
    {
        super( toaster,
               stockPositionStateStore,
               stockPositionController,
               stockPositionFactory,
               stockPositionCrudService )
    }
}
