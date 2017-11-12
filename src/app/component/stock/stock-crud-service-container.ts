import { CrudServiceContainer } from "../crud/common/crud-service-container";
import { Injectable } from "@angular/core";
import { StockFactory } from "../../model/factory/stock.factory";
import { StockCrudService } from "../../service/crud/stock-crud.service";
import { Stock } from "../../model/entity/stock";
import { ModelObjectChangeService } from "../../service/crud/model-object-change.service";

/**
 * This is the CRUD service class for Stock model objects.
 */
@Injectable()
export class StockCrudServiceContainer extends CrudServiceContainer<Stock>
{
    constructor( private _stockFactory: StockFactory,
                 private _stockCrudService: StockCrudService )
    {
        super( new ModelObjectChangeService<Stock>(), _stockFactory, _stockCrudService )
    }

    get stockFactory(): StockFactory { return this._stockFactory; }

    set stockFactory( value: StockFactory ) { this._stockFactory = value; }

    get stockCrudService(): StockCrudService { return this._stockCrudService; }

    set stockCrudService( value: StockCrudService ) { this._stockCrudService = value; }

}
