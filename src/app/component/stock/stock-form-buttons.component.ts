import { Component } from "@angular/core";
import { CrudFormButtonsComponent } from "../crud/form/crud-form-buttons.component";
import { ToastsManager } from "ng2-toastr";
import { Stock } from "../../model/entity/stock";
import { StockController } from './stock-controller';
import { StockStateStore } from './stock-crud-state-store';
import { StockFactory } from '../../model/factory/stock.factory';
import { StockCrudService } from '../../service/crud/stock-crud.service';

/**
 * Button panel component for the Stock dialog.
 *
 * Created by mike on 12/31/2016.
 */
@Component({
    selector:    'stock-form-buttons',
    templateUrl: '../crud/form/crud-form-buttons.component.html'
})
export class StockFormButtonsComponent extends CrudFormButtonsComponent<Stock>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockStateStore} stockStateStore
     * @param {StockController} stockController
     * @param {StockFactory} stockFactory
     * @param {StockCrudService} stockCrudService
     */
    constructor( protected toaster: ToastsManager,
                 protected stockStateStore: StockStateStore,
                 protected stockController: StockController,
                 protected stockFactory: StockFactory,
                 protected stockCrudService: StockCrudService )
    {
        super( toaster,
               stockStateStore,
               stockController,
               stockFactory,
               stockCrudService );
    }

    /**
     * Display the Ticker Symbol to confirm delete
     * @return {string}
     */
    public getDeleteKeyword(): string
    {
        return this.modelObject.tickerSymbol;
    }
}
