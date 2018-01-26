import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CrudDialogComponent } from "../crud/dialog/crud-dialog.component";
import { Stock } from "../../model/entity/stock";
import { StockStateStore } from './stock-crud-state-store';
import { StockController } from './stock-controller';
import { StockFactory } from '../../model/factory/stock.factory';

/**
 * This class manages the modal dialog that contains the Stock
 * editing fields
 *
 * Created by mike on 11/19/2016.
 */
@Component
({
    selector:    'stock-dialog',
    templateUrl: './stock-dialog.component.html'
})
export class StockDialogComponent extends CrudDialogComponent<Stock>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockStateStore} stockStateStore
     * @param {StockController} stockController
     * @param {StockFactory} stockFactory
     */
    constructor( protected toaster: ToastsManager,
                 protected stockStateStore: StockStateStore,
                 protected stockController: StockController,
                 protected stockFactory: StockFactory )
    {
        super( toaster,
               stockStateStore,
               stockController,
               stockFactory );
    }

    /**
     * This method is called when a 409 HTTP Code is received from a rest call.
     */
    public getDuplicateKeyErrorMessage(): string
    {
        return this.modelObject.tickerSymbol + " already exists";
    }
}
