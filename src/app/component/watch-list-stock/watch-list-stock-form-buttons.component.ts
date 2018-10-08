import { ChangeDetectorRef, Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CrudFormButtonsComponent } from "../crud/form/crud-form-buttons.component";
import { WatchListStock } from "../../model/entity/watch-list-stock";
import { WatchListStockStateStore } from './watch-list-stock-state-store.service';
import { WatchListStockController } from './watch-list-stock-controller';
import { WatchListStockFactory } from '../../model/factory/watch-list-stock.factory';
import { WatchListStockCrudService } from '../../service/crud/watch-list-stock-crud.service';

/**
 * Button panel component for the WatchList dialog.
 *
 * Created by mike on 8/15/2017.
 */
@Component({
    selector:    'watch-list-stock-form-buttons',
    templateUrl: '../crud/form/crud-form-buttons.component.html',
    styleUrls: ['../crud/form/crud-form-buttons.component.css']
})
export class WatchListStockFormButtonsComponent extends CrudFormButtonsComponent<WatchListStock>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {WatchListStateStore} watchListStockStateStore
     * @param {WatchListStockController} watchListStockController
     * @param {WatchListFactory} watchListStockFactory
     * @param {WatchListCrudService} watchListStockCrudService
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected toaster: ToastsManager,
                 private watchListStockStateStore: WatchListStockStateStore,
                 private watchListStockController: WatchListStockController,
                 private watchListStockFactory: WatchListStockFactory,
                 private watchListStockCrudService: WatchListStockCrudService )
    {
        super( changeDetector,
               toaster,
               watchListStockStateStore,
               watchListStockController,
               watchListStockFactory,
               watchListStockCrudService );
    }

    /**
     * Defines the message to display to the user in the dialog when deleting the model object
     */
    public getDeleteMessage( watchListStock: WatchListStock ): string
    {
        return 'Are you sure you want to delete ' + watchListStock.tickerSymbol + "?";
    }

    /**
     * @return {undefined}
     */
    public getDeleteKeyword(): string
    {
        return 'Watch List'
    }

    /**
     * This method is called to get the message to display to the user that the mdoel object was saved successfully.
     * @param {T} modelObject
     * @returns {string}
     */
    protected getSaveSuccessFulMessage( watchListStock: WatchListStock )
    {
        return "Save Successful for " + watchListStock.tickerSymbol;
    }
}
