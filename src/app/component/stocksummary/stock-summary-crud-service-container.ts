import { CrudServiceContainer } from "../crud/common/crud-service-container";
import { Injectable } from "@angular/core";
import { StockSummaryCrudService } from "../../service/crud/stock-summary-crud.service";
import { StockSummary } from "../../model/entity/stock-summary";
import { StockSummaryFactory } from "../../model/factory/stock-summary.factory";

/**
 * This is the service container for the StockSummary entity.
 */
@Injectable()
export class StockSummaryCrudServiceContainer extends CrudServiceContainer<StockSummary>
{
    constructor( private _stockSummaryFactory: StockSummaryFactory,
                 private _stockSummaryCrudService: StockSummaryCrudService )
    {
        super( _stockSummaryFactory, _stockSummaryCrudService )
    }

    get stockSummaryFactory(): StockSummaryFactory { return this._stockSummaryFactory; }

    set stockSummaryFactory( value: StockSummaryFactory ) { this._stockSummaryFactory = value; }

    get stockSummaryCrudService(): StockSummaryCrudService { return this._stockSummaryCrudService; }

    set stockSummaryCrudService( value: StockSummaryCrudService ) { this._stockSummaryCrudService = value; }

}
