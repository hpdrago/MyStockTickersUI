import { CrudServiceContainer } from "../crud/common/crud-service-container";
import { Injectable } from "@angular/core";
import { StockAnalyticsCrudService } from "../../service/crud/stock-analytics-crud.service";
import { StockAnalytics } from "../../model/entity/stock-analytics";
import { StockAnalyticsFactory } from "../../model/factory/stock-analytics.factory";

/**
 * This is the service container for the StockAnalytics entity.
 */
@Injectable()
export class StockAnalyticsCrudServiceContainer extends CrudServiceContainer<StockAnalytics>
{
    constructor( private _stockAnalyticsFactory: StockAnalyticsFactory,
                 private _stockAnalyticsCrudService: StockAnalyticsCrudService )
    {
        super( _stockAnalyticsFactory, _stockAnalyticsCrudService )
    }

    get stockAnalyticsFactory(): StockAnalyticsFactory { return this._stockAnalyticsFactory; }

    set stockAnalyticsFactory( value: StockAnalyticsFactory ) { this._stockAnalyticsFactory = value; }

    get stockAnalyticsCrudService(): StockAnalyticsCrudService { return this._stockAnalyticsCrudService; }

    set stockAnalyticsCrudService( value: StockAnalyticsCrudService ) { this._stockAnalyticsCrudService = value; }

}
