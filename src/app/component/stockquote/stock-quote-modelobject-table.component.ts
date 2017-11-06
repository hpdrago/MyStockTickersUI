/**
 * Created by mike on 11/4/2017
 */
import { CrudTableComponent } from "../crud/table/crud-table.component";
import { StockQuoteModelObject } from "../../model/entity/stock-quote-modelobject";
import { StockQuoteState } from "../common/stock-quote-state";
import { StockQuoteRefreshService } from "../../service/stock-quote-refresh.service";
import { ToastsManager } from "ng2-toastr";
import { CrudServiceContainer } from "../crud/common/crud-service-container";
import { StockQuote } from "../../model/entity/stock-quote";

export class StockQuoteModelObjectTableComponent<T extends StockQuoteModelObject<T>> extends CrudTableComponent<T>
{
    constructor( protected toaster: ToastsManager,
                 protected crudServiceContainer: CrudServiceContainer<T>,
                 protected stockQuoteRefreshService: StockQuoteRefreshService )
    {
        super( toaster, crudServiceContainer );
    }

    /**
     * This method is override to evaluate the {@code stockQuoteModelObjects} to see if they need their stock quote
     * information refreshed.  The backend will refresh those quote where it already has the information in the cache
     * that is not stale.  Subsequent calls to get the refreshed data is necessary so that the loading of the table
     * is quick and the refreshes can happen in the background.
     * @param {T[]} modelObjects
     */
    protected onTableLoad( modelObjects: T[] ): void
    {
        this.debug( 'onTableLoad.overridden.begin ' + JSON.stringify( modelObjects ));
        super.onTableLoad( modelObjects );
        modelObjects.forEach( stockQuoteModelObject =>
        {
            if ( stockQuoteModelObject.stockQuoteState == StockQuoteState.NOT_CACHED ||
                 stockQuoteModelObject.stockQuoteState == StockQuoteState.STALE )
            {
                this.stockQuoteRefreshService
                    .refreshStockQuote( stockQuoteModelObject )
                    .subscribe( (stockQuote: StockQuote) =>
                    {
                        this.debug( 'onTableLoad.overridden stockQuote: ' + JSON.stringify( stockQuote ));
                        stockQuoteModelObject.companyName = stockQuote.companyName;
                        stockQuoteModelObject.stockQuoteState = stockQuote.stockQuoteState;
                        stockQuoteModelObject.lastPrice = stockQuote.lastPrice;
                        stockQuoteModelObject.lastPriceChange = stockQuote.lastPriceChange;
                    },
                    error =>
                    {
                        stockQuoteModelObject.stockQuoteState = StockQuoteState.FAILURE;
                        this.debug( "Error " + error + " refreshing stock quote: " + JSON.stringify( stockQuoteModelObject ));
                    }
                );
            }
        });
        this.log( 'onTableLoad.overridden.end' );
    }

    /**
     * This method is called to report the failure to find a stock quote work object in the table.
     * @param {T} stockQuoteModelObject
     */
    protected stockQuoteNotFoundInTable( stockQuoteModelObject: T )
    {
        this.log( "stockQuoteNotFoundInTable: " + JSON.stringify( stockQuoteModelObject ));
    }

    /**
     *
     * @param {T} stockQuoteModelObject
     * @returns {boolean}
     */
    protected isFetchingQuote( stockQuoteModelObject: T )
    {
        return stockQuoteModelObject.stockQuoteState == StockQuoteState.NOT_CACHED ||
               stockQuoteModelObject.stockQuoteState == StockQuoteState.STALE;
    }
}
