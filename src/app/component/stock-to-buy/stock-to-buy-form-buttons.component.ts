import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CrudFormButtonsComponent } from "../crud/form/crud-form-buttons.component";
import { StockToBuy } from "../../model/entity/stock-to-buy";
import { StockToBuyStateStore } from './stock-to-buy-state-store';
import { StockToBuyController } from './stock-to-buy-controller';
import { StockToBuyFactory } from '../../model/factory/stock-to-buy.factory';
import { StockToBuyCrudService } from '../../service/crud/stock-to-buy-crud.service';

/**
 * Button panel component for the StockToBuy dialog.
 *
 * Created by mike on 8/15/2017.
 */
@Component({
    selector:    'stock-to-buy-form-buttons',
    templateUrl: '../crud/form/crud-form-buttons.component.html',
    styleUrls: ['../crud/form/crud-form-buttons.component.css']
})
export class StockToBuyFormButtonsComponent extends CrudFormButtonsComponent<StockToBuy>
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

    /**
     * Defines the message to display to the user in the dialog when deleting the model object
     */
    public getDeleteMessage( stockToBuy: StockToBuy ): string
    {
        return 'Are you sure you want to delete ' + stockToBuy.tickerSymbol + "?";
    }

    /**
     * @return {undefined}
     */
    public getDeleteKeyword(): string
    {
        return 'StockCompany To Buy'
    }

    /**
     * This method is called to get the message to display to the user that the mdoel object was saved successfully.
     * @param {T} modelObject
     * @returns {string}
     */
    protected getSaveSuccessFulMessage( stockToBuy: StockToBuy )
    {
        return "Save Successful for " + stockToBuy.tickerSymbol;
    }
}
