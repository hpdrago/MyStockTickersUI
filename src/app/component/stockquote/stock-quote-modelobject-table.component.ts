import { StockQuoteModelObject } from "../../model/entity/stock-quote-modelobject";
import { StockQuoteState } from "../../common/stock-quote-state.enum";
import { StockQuoteRefreshService } from "../../service/stock-quote-refresh.service";
import { ToastsManager } from "ng2-toastr";
import { StockQuote } from "../../model/entity/stock-quote";
import { isNullOrUndefined } from "util";
import { StockModelObjectTableComponent } from "../common/stock-model-object-table-component";
import { CrudStateStore } from '../crud/common/crud-state-store';
import { CrudController } from '../crud/common/crud-controller';
import { ModelObjectFactory } from '../../model/factory/model-object.factory';
import { CrudRestService } from '../../service/crud/crud-rest.serivce';

/**
 * This is a base class for tables that contain Stock Quote information.  It provides the common methods for updating
 * the stock quote information based on the state of the quote.  For quotes that are not cached in the backend stock cache
 * and those quotes that are stale, this class will handle the retrieving of the updated information and updating the
 * containing table.
 *
 * Created by mike on 11/4/2017
 */
export abstract class StockQuoteModelObjectTableComponent<T extends StockQuoteModelObject<T>>
    extends StockModelObjectTableComponent<T>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {CrudStateStore<T extends StockQuoteModelObject<T>>} stockStateStore
     * @param {CrudController<T extends StockQuoteModelObject<T>>} stockController
     * @param {ModelObjectFactory<T extends StockQuoteModelObject<T>>} stockFactory
     * @param {CrudRestService<T extends StockQuoteModelObject<T>>} stockCrudService
     * @param {StockQuoteRefreshService} stockQuoteRefreshService
     */
    constructor( protected toaster: ToastsManager,
                 protected stockStateStore: CrudStateStore<T>,
                 protected stockController: CrudController<T>,
                 protected stockFactory: ModelObjectFactory<T>,
                 protected stockCrudService: CrudRestService<T>,
                 protected stockQuoteRefreshService: StockQuoteRefreshService )
    {
        super( toaster,
               stockStateStore,
               stockController,
               stockFactory,
               stockCrudService );
    }

    /**
     * This method is overriden to evaluate the {@code stockQuoteModelObjects} to see if they need their stock quote
     * information refreshed.  The backend will refresh those quote where it already has the information in the cache
     * that is not stale.  Subsequent calls to get the refreshed data is necessary so that the loading of the table
     * is quick and the refreshes can happen in the background.
     * @param {T[]} modelObjects
     */
    protected onTableLoad( modelObjects: T[] ): void
    {
        this.debug( 'onTableLoad.overridden.begin getting stock quotes' );
        super.onTableLoad( modelObjects );
        if ( !isNullOrUndefined( modelObjects ))
        {
            /*
             * The table is loaded, get quotes for those stocks that are stale or not cached already
             */
            modelObjects.forEach( stockQuoteModelObject =>
                                  {
                                      if ( stockQuoteModelObject.stockQuoteState == StockQuoteState.NOT_CACHED ||
                                          stockQuoteModelObject.stockQuoteState == StockQuoteState.STALE )
                                      {
                                          this.stockQuoteRefreshService
                                              .refreshStockQuote( stockQuoteModelObject )
                                              .subscribe( ( stockQuote: StockQuote ) =>
                                                          {
                                                              //this.debug( 'onTableLoad.overridden stockQuote: ' + JSON.stringify( stockQuote ));
                                                              stockQuoteModelObject.companyName = stockQuote.companyName;
                                                              stockQuoteModelObject.stockQuoteState = stockQuote.stockQuoteState;
                                                              stockQuoteModelObject.lastPrice = stockQuote.lastPrice;
                                                              stockQuoteModelObject.lastPriceChange = stockQuote.lastPriceChange;
                                                          },
                                                          error =>
                                                          {
                                                              stockQuoteModelObject.stockQuoteState = StockQuoteState.FAILURE;
                                                              this.debug( "Error " + error + " refreshing stock quote: " + JSON.stringify( stockQuoteModelObject ) );
                                                          }
                                              );
                                      }
                                  } );
        }
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

    /**
     * Determines the percent of change from the original price to the last price.
     * @return A percent of change.
     */
    protected calculatePercentChange( stockQuote: StockQuote ): number
    {
        if ( isNullOrUndefined( stockQuote ))
        {
            return 0;
        }
        {
            if ( stockQuote.lastPrice == null || stockQuote.lastPrice == 0 )
            {
                return 0;
            }
            if ( stockQuote.stockPriceWhenCreated == null || stockQuote.stockPriceWhenCreated == 0 )
            {
                return 0;
            }
            let percentChanged = 1.0 - ( stockQuote.stockPriceWhenCreated / stockQuote.lastPrice );
            return percentChanged;
        }
    }

    /**
     * Calculates the amount of upside potential from current stock price to the average analyst price
     * @param rowData
     * @returns {number}
     */
    protected calcAvgUpsidePercent( rowData ): number
    {
        if ( rowData.lastPrice != null &&
             rowData.avgAnalystPriceTarget != null &&
             rowData.avgAnalystPriceTarget > 0.0 )
        {
            if ( rowData.lastPrice < rowData.avgAnalystPriceTarget )
            {
                return rowData.lastPrice / rowData.avgAnalystPriceTarget;
            }
            else
            {
                return (rowData.avgAnalystPriceTarget / rowData.lastPrice);
            }
        }
        else
        {
            return 0;
        }
    }
}
