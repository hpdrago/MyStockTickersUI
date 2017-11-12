import { CrudServiceContainer } from "../crud/common/crud-service-container";
import { Injectable } from "@angular/core";
import { StockCatalystEvent } from "../../model/entity/stock-catalyst-event";
import { StockCatalystEventFactory } from "../../model/factory/stock-catalyst-event.factory";
import { StockCatalystEventCrudService } from "../../service/crud/stock-catalyst-event-crud.service";
import { ModelObjectChangeService } from "../../service/crud/model-object-change.service";

/**
 * This is the service container for the StockCatalystEvent entity.
 */
@Injectable()
export class StockCatalystEventCrudServiceContainer extends CrudServiceContainer<StockCatalystEvent>
{
    constructor( private _stockCatalystEventFactory: StockCatalystEventFactory,
                 private _stockCatalystEventCrudService: StockCatalystEventCrudService )
    {
        super( new ModelObjectChangeService<StockCatalystEvent>(), _stockCatalystEventFactory,
               _stockCatalystEventCrudService )
    }

    get stockCatalystEventFactory(): StockCatalystEventFactory { return this._stockCatalystEventFactory; }

    set stockCatalystEventFactory( value: StockCatalystEventFactory ) { this._stockCatalystEventFactory = value; }

    get stockCatalystEventCrudService(): StockCatalystEventCrudService { return this._stockCatalystEventCrudService; }

    set stockCatalystEventCrudService( value: StockCatalystEventCrudService ) { this._stockCatalystEventCrudService = value; }

}
