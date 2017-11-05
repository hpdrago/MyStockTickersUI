/**
 * Created by mike on 11/4/2017
 */
import { CrudTableComponent } from "../crud/table/crud-table.component";
import { StockQuoteModelObject } from "../../model/entity/stock-quote-modelobject";
import { StockQuoteState } from "../common/stock-quote-state";
import { StockQuoteRefreshService } from "../../service/stock-quote-refresh.service";
import { ToastsManager } from "ng2-toastr";
import { CrudServiceContainer } from "../crud/common/crud-service-container";

export class StockQuoteModelObjectTableComponent<T extends StockQuoteModelObject<T>> extends CrudTableComponent<T>
{
    constructor( protected stockQuoteRefreshService: StockQuoteRefreshService,
                 protected toaster: ToastsManager,
                 protected crudServiceContainer: CrudServiceContainer<T> )
    {
        super( toaster, crudServiceContainer );
    }

    protected onTableLoad( modelObjects: T[] ): void
    {
        this.log( JSON.stringify( modelObjects ));
        for ( let modelObject of modelObjects )
        {
            if ( this.modelObject.stockQuoteState == StockQuoteState.NOT_CACHED ||
                 this.modelObject.stockQuoteState == StockQuoteState.STALE )
            {
                this.stockQuoteRefreshService.refre
            }
        }
        super.onTableLoad( modelObjects );
    }
}
