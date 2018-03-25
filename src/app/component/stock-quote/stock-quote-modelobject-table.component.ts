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
import { TableLoadingStrategy } from '../common/table-loading-strategy';
import { StockAnalystConsensus } from '../../model/entity/stock-analyst-consensus';
import { StockAnalystConsensusCache } from '../../service/stock-analyst-consensus-cache';

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
     * @param {TableLoadingStrategy} tableLoadingStrategy
     * @param {ToastsManager} toaster
     * @param {CrudStateStore<T extends StockQuoteModelObject<T>>} stockStateStore
     * @param {CrudController<T extends StockQuoteModelObject<T>>} stockController
     * @param {ModelObjectFactory<T extends StockQuoteModelObject<T>>} stockFactory
     * @param {CrudRestService<T extends StockQuoteModelObject<T>>} stockCrudService
     * @param {StockQuoteRefreshService} stockQuoteRefreshService
     * @param {StockAnalystConsensusCache} stockAnalystConsensusCache
     */
    constructor( protected tableLoadingStrategy: TableLoadingStrategy,
                 protected toaster: ToastsManager,
                 protected stockStateStore: CrudStateStore<T>,
                 protected stockController: CrudController<T>,
                 protected stockFactory: ModelObjectFactory<T>,
                 protected stockCrudService: CrudRestService<T>,
                 protected stockQuoteRefreshService: StockQuoteRefreshService,
                 protected stockAnalystConsensusCache: StockAnalystConsensusCache )
    {
        super( tableLoadingStrategy,
               toaster,
               stockStateStore,
               stockController,
               stockFactory,
               stockCrudService );
    }

    /**
     * This method is overridden to evaluate the {@code stockQuoteModelObjects} to see if they need their stock quote
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
                                      this.updateStockQuote( stockQuoteModelObject );
                                      this.updateAnalystConsensus( stockQuoteModelObject );
                                  } );
        }
        this.log( 'onTableLoad.overridden.end' );
    }

    /**
     * Evaluatest eh stock quote model object to check the state of the stock quote information.  If the stock quote
     * information is stale, the stock quote information will be updated asynchronously.
     * @param stockQuoteModelObject
     */
    private updateStockQuote( stockQuoteModelObject )
    {
        if ( stockQuoteModelObject.stockQuoteState == StockQuoteState.NOT_CACHED ||
            stockQuoteModelObject.stockQuoteState == StockQuoteState.STALE )
        {
            this.stockQuoteRefreshService
                .refreshStockQuote( stockQuoteModelObject )
                .subscribe( ( stockQuote: StockQuote ) => {
                                //this.debug( 'onTableLoad.overridden stockQuote: ' + JSON.stringify( stockQuote ));
                                stockQuoteModelObject.companyName = stockQuote.companyName;
                                stockQuoteModelObject.stockQuoteState = stockQuote.stockQuoteState;
                                stockQuoteModelObject.lastPrice = stockQuote.lastPrice;
                                stockQuoteModelObject.lastPriceChange = stockQuote.lastPriceChange;
                            },
                            error => {
                                stockQuoteModelObject.stockQuoteState = StockQuoteState.FAILURE;
                                this.debug( "Error " + error + " refreshing stock quote: " + JSON.stringify(
                                    stockQuoteModelObject ) );
                            }
                );
        }
    }

    /**
     * Checks the stock analyst consensus cache to see if analyst consensus information exists for the ticker symbol and
     * if found, updates the stock quote model object with the stock analyst consensus information.
     * @param {T} stockQuoteModelObject
     */
    private updateAnalystConsensus( stockQuoteModelObject: T )
    {
        let methodName = 'updateAnalystConsensus';
        let stockAnalystConsensus: StockAnalystConsensus = this.stockAnalystConsensusCache
                                                               .get( stockQuoteModelObject.tickerSymbol );
        if ( !isNullOrUndefined( stockAnalystConsensus ) )
        {
            this.log( methodName + ' ' + JSON.stringify( stockAnalystConsensus ));
            stockQuoteModelObject.analystStrongBuyCount = stockAnalystConsensus.analystStrongBuyCount;
            stockQuoteModelObject.analystBuyCount = stockAnalystConsensus.analystBuyCount;
            stockQuoteModelObject.analystHoldCount = stockAnalystConsensus.analystHoldCount;
            stockQuoteModelObject.analystUnderPerformCount = stockAnalystConsensus.analystUnderPerformCount;
            stockQuoteModelObject.analystSellCount = stockAnalystConsensus.analystSellCount;
            stockQuoteModelObject.lowAnalystPriceTarget = stockAnalystConsensus.lowAnalystPriceTarget;
            stockQuoteModelObject.avgAnalystPriceTarget = stockAnalystConsensus.avgAnalystPriceTarget;
            stockQuoteModelObject.highAnalystPriceTarget = stockAnalystConsensus.highAnalystPriceTarget;
        }
    }

    /**
     * This method is called to report the failure to find a stock quote work object in the table.
     * @param {T} stockQuoteModelObject
     */
    protected stockQuoteNotFoundInTable( stockQuoteModelObject: T )
    {
        this.log( "stockQuoteNotFoundInTable: " + JSON.stringify( stockQuoteModelObject ));
    }
}
