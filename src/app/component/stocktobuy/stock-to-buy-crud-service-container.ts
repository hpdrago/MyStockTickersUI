import { CrudServiceContainer } from "../crud/common/crud-service-container";
import { Injectable } from "@angular/core";
import { StockToBuy } from "../../model/entity/stock-to-buy";
import { StockToBuyFactory } from "../../model/factory/stock-to-buy.factory";
import { StockToBuyCrudService } from "../../service/crud/stock-to-buy-crud.service";
import { CrudDialogService } from "../crud/dialog/crud-dialog.service";

/**
 * This is the service container for the StockToBuy entity.
 */
@Injectable()
export class StockToBuyCrudServiceContainer extends CrudServiceContainer<StockToBuy>
{
    /**
     * Constructor.
     * @param {StockToBuyFactory} _stockToBuyFactory
     * @param {StockToBuyCrudService} _stockToBuyCrudService
     */
    constructor( private _stockToBuyFactory: StockToBuyFactory,
                 private _stockToBuyCrudService: StockToBuyCrudService )
    {
        super( _stockToBuyFactory, _stockToBuyCrudService )
        this.crudDialogService = new CrudDialogService<StockToBuy>( _stockToBuyFactory,
                                                                    this.crudStateStore,
                                                                    this.crudFormButtonsService );
        this.crudPanelService = this.crudDialogService;
    }

    get stockToBuyFactory(): StockToBuyFactory { return this._stockToBuyFactory; }
    get stockToBuyCrudService(): StockToBuyCrudService { return this._stockToBuyCrudService; }
}
