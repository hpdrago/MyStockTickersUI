import { CrudActionHandler } from './crud-action-handler';
import { StockModelObject } from '../../../model/common/stock-model-object';
import { StockPriceQuote } from '../../../model/entity/stock-price-quote';
import { RestErrorReporter } from '../../../service/rest-error-reporter';
import { ToastsManager } from 'ng2-toastr';
import { StockPriceQuoteCacheService } from '../../../service/cache/stock-price-quote-cache.service';
import { StockQuoteCacheService } from '../../../service/cache/stock-quote-cache.service';
import { CrudRestService } from '../../../service/crud/crud-rest.serivce';
import { StockQuote } from '../../../model/entity/stock-quote';
import { isNullOrUndefined } from 'util';

/**
 * This class provide automatic registration with the stock information caches to receive up to date stock information
 * including stock price quotes and stock quotes.
 */
export abstract class StockModelObjectCrudActionHandler<T extends StockModelObject<T>>  extends CrudActionHandler<T>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {RestErrorReporter} restErrorReporter
     * @param {CrudRestService<T extends StockModelObject<T>>} crudService
     * @param {StockPriceQuoteCacheService} stockPriceQuoteCacheService
     * @param {StockQuoteCacheService} stockQuoteCacheService
     */
    protected constructor( protected toaster: ToastsManager,
                           protected restErrorReporter: RestErrorReporter,
                           protected crudService: CrudRestService<T>,
                           protected stockPriceQuoteCacheService: StockPriceQuoteCacheService,
                           protected stockQuoteCacheService: StockQuoteCacheService )
    {
        super( toaster,
               restErrorReporter,
               crudService );
    }

    /**
     * Register with the caches for stock information updates.
     * @param {StockNotes} stockNotes
     */
    protected onModelObjectAdd( stockModelObject: StockModelObject<T> )
    {
        this.stockPriceQuoteCacheService
            .subscribeToChanges( stockModelObject.tickerSymbol, (stockPriceQuote: StockPriceQuote ) =>
                this.onStockPriceQuoteChange( stockModelObject, stockPriceQuote ))
        this.stockQuoteCacheService
            .subscribeToChanges(stockModelObject.tickerSymbol, (stockQuote: StockQuote) =>
                this.onStockQuoteChange( stockModelObject, stockQuote ));
    }

    /**
     * This method is called when the stock price quote changes.  The price quote is assigned to the {@code stockModelObject}
     * @param {StockModelObject<T extends StockModelObject<T>>} stockModelObject
     * @param {StockPriceQuote} stockPriceQuote
     */
    protected onStockPriceQuoteChange( stockModelObject: StockModelObject<T>, stockPriceQuote: StockPriceQuote )
    {
        if ( !isNullOrUndefined( stockPriceQuote ))
        {
            const methodName = 'onStockPriceQuoteChange';
            this.debug( methodName + ' ' + stockPriceQuote.tickerSymbol )
            stockModelObject.stockPriceQuote = stockPriceQuote;
        }
    }

    /**
     * This method is called when a stock quote changes.  The quote is assigned to the model object.
     * @param {StockModelObject<any>} stockModelObject
     * @param {StockQuote} stockQuote
     */
    protected onStockQuoteChange( stockModelObject: StockModelObject<T>, stockQuote: StockQuote )
    {
        if ( !isNullOrUndefined( stockQuote ))
        {
            const methodName = 'onStockQuoteChange';
            this.debug( methodName + ' ' + stockQuote.tickerSymbol )
            stockModelObject.stockQuote = stockQuote;
        }
    }
}
