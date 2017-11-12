import { CrudServiceContainer } from "../crud/common/crud-service-container";
import { Injectable } from "@angular/core";
import { StockToBuy } from "../../model/entity/stock-to-buy";
import { StockToBuyFactory } from "../../model/factory/stock-to-buy.factory";
import { StockToBuyCrudService } from "../../service/crud/stock-to-buy-crud.service";
import { ModelObjectChangeService } from "../../service/crud/model-object-change.service";

/**
 * This is the service container for the StockToBuy entity.
 */
@Injectable()
export class StockToBuyCrudServiceContainer extends CrudServiceContainer<StockToBuy>
{
    constructor( private _stockToBuyFactory: StockToBuyFactory,
                 private _stockToBuyCrudService: StockToBuyCrudService )
    {
        super( new ModelObjectChangeService<StockToBuy>(), _stockToBuyFactory, _stockToBuyCrudService )
    }

    get stockToBuyFactory(): StockToBuyFactory { return this._stockToBuyFactory; }

    set stockToBuyFactory( value: StockToBuyFactory ) { this._stockToBuyFactory = value; }

    get stockToBuyCrudService(): StockToBuyCrudService { return this._stockToBuyCrudService; }

    set stockToBuyCrudService( value: StockToBuyCrudService ) { this._stockToBuyCrudService = value; }

}
