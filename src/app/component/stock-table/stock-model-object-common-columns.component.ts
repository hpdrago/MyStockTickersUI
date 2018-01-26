import { BaseComponent } from '../common/base.component';
import { Component, Input, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { CrudTableColumnCachedDataType } from '../crud/table/crud-table-column-cached-data-type';
import { StockModelObject } from '../../model/common/stock-model-object';
import { CrudTableColumn } from '../crud/table/crud-table-column';
import { StockQuoteCacheService } from '../../service/cache/stock-quote-cache.service';
import { StockPriceQuoteCacheService } from '../../service/cache/stock-price-quote-cache.service';
import { StockPriceQuote } from '../../model/entity/stock-price-quote';
import { StockQuote } from '../../model/entity/stock-quote';
import { CachedValueState } from '../../common/cached-value-state.enum';

/**
 * This component will check the column and model object to see if it is a standard stock model object field that is
 * being displayed or if it is a cached model object value from StockQuote or StockPriceQuote and get the value
 * from there.  Otherwise, the column value will be displayed based on the column data type specified in the column
 * definition.
 */
@Component
({
    selector: 'stock-model-object-common-columns',
    templateUrl: './stock-model-object-common-columns.component.html'
})
export class StockModelObjectCommonColumnsComponent extends BaseComponent implements OnInit
{
    @Input()
    protected column: CrudTableColumn;

    @Input()
    protected modelObject: StockModelObject<any>;

    protected CrudTableColumnCachedDataType = CrudTableColumnCachedDataType;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockQuoteCacheService} stockQuoteCache
     * @param {StockPriceQuoteCacheService} stockPriceQuoteCache
     */
    public constructor( protected toaster: ToastsManager,
                        protected stockQuoteCache: StockQuoteCacheService,
                        protected stockPriceQuoteCache: StockPriceQuoteCacheService )
    {
        super( toaster );
    }

    /**
     * Checks the column to see if it a cached value and if so registers it for updates.
     */
    public ngOnInit(): void
    {
        const methodName = 'ngOnInit';
        this.debug( `${methodName} column: ${this.column.colId}`);
        switch ( this.column.cachedDataType )
        {
            case CrudTableColumnCachedDataType.STOCK_PRICE_QUOTE:
                this.debug( `${methodName} registering ${this.modelObject.tickerSymbol} for stock price quote change` );
                this.stockPriceQuoteCache
                    .subscribe( this.modelObject.tickerSymbol,
                                (stockPriceQuote) => this.onStockPriceQuoteChanged( stockPriceQuote ) )
                break;

            case CrudTableColumnCachedDataType.STOCK_QUOTE:
                this.debug( `${methodName} registering ${this.modelObject.tickerSymbol} for stock quote change` );
                this.stockQuoteCache
                    .subscribe( this.modelObject.tickerSymbol,
                                (stockQuote) => this.onStockQuoteChanged( stockQuote ) )
                break;
        }
    }

    /**
     * This method is called when the stock price quote has changed.
     * @param {StockPriceQuote} stockPriceQuote
     */
    private onStockPriceQuoteChanged( stockPriceQuote: StockPriceQuote )
    {
        const methodName = 'onStockPriceQuoteChanged';
        this.debug( `${methodName} ${this.column.colId} ${stockPriceQuote.tickerSymbol} ${CachedValueState.getName(stockPriceQuote.cacheState)}` );
        this.modelObject.stockPriceQuote = <any>stockPriceQuote;
    }

    /**
     * This method is called when the stock quote has changed.
     * @param {StockQuote} stockQuote
     */
    private onStockQuoteChanged( stockQuote: StockQuote )
    {
        const methodName = 'onStockQuoteChanged';
        this.debug( `${methodName} ${this.column.colId} ${stockQuote.tickerSymbol} ${CachedValueState.getName(stockQuote.cacheState)}` );
        this.modelObject.stockQuote = <any>stockQuote;
    }
}
