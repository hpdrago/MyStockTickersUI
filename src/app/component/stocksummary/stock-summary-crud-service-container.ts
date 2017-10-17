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
    constructor( private _stockNoteFactory: StockSummaryFactory,
                 private _stockNoteCrudService: StockSummaryCrudService )
    {
        super( _stockNoteFactory, _stockNoteCrudService )
    }

    get stockNoteFactory(): StockSummaryFactory { return this._stockNoteFactory; }

    set stockNoteFactory( value: StockSummaryFactory ) { this._stockNoteFactory = value; }

    get stockNoteCrudService(): StockSummaryCrudService { return this._stockNoteCrudService; }

    set stockNoteCrudService( value: StockSummaryCrudService ) { this._stockNoteCrudService = value; }

}
