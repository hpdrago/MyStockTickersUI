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
import { StockCompanyCacheService } from '../../service/cache/stock-company-cache.service';
import { StockCompany } from '../../model/entity/stock-company';
import { GainsLossesCache } from '../../service/cache/gains-losses-cache';
import { CrudTableColumnType } from '../../component/crud/table/crud-table-column-type';
import { StockAnalystConsensusCache } from '../../service/cache/stock-analyst-consensus-cache';
import { StockAnalystConsensus } from '../../model/entity/stock-analyst-consensus';
import { GainsLosses } from '../../model/entity/gains-losses';

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
    protected CrudTableColumnType = CrudTableColumnType;
    protected CachedValueState = CachedValueState;

    @Input()
    protected column: CrudTableColumn;

    @Input()
    protected modelObject: StockModelObject<any>;

    protected CrudTableColumnCachedDataType = CrudTableColumnCachedDataType;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockCompanyCacheService} stockCompanyCache
     * @param {StockQuoteCacheService} stockQuoteCache
     * @param {StockPriceQuoteCacheService} stockPriceQuoteCache
     * @param {GainsLossesCache} stockGainsLossesCache
     * @param {StockAnalystConsensusCache} stockAnalystConsensusCache
     */
    public constructor( protected toaster: ToastsManager,
                        protected stockCompanyCache: StockCompanyCacheService,
                        protected stockQuoteCache: StockQuoteCacheService,
                        protected stockPriceQuoteCache: StockPriceQuoteCacheService,
                        protected stockGainsLossesCache: GainsLossesCache,
                        protected stockAnalystConsensusCache: StockAnalystConsensusCache )
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

            case CrudTableColumnCachedDataType.STOCK_COMPANY:
                this.debug( `${methodName} registering ${this.modelObject.tickerSymbol} for stock company change` );
                this.stockCompanyCache
                    .subscribe( this.modelObject.tickerSymbol,
                                (stockCompany) => this.onStockCompanyChanged( stockCompany ) )
                break;

            case CrudTableColumnCachedDataType.STOCK_GAINS_LOSSES:
                this.debug( `${methodName} retrieving ${this.modelObject.tickerSymbol} for stock gains` );
                this.stockGainsLossesCache
                    .subscribe( this.modelObject.tickerSymbol, (gainsLosses) => this.gainsLossesChanged( gainsLosses ) );
                break;

            case CrudTableColumnCachedDataType.STOCK_ANALYST_CONSENSUS:
                this.debug( `${methodName} retrieving ${this.modelObject.tickerSymbol} for stock analyst consensus` );
                this.stockAnalystConsensusCache
                    .subscribe( this.modelObject.tickerSymbol,
                                (stockAnalystConsensus) => this.onStockAnalystConsensusChange( stockAnalystConsensus ) )
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

    /**
     * This method is called when the stock company changes.
     * @param {StockCompany} stockCompany
     */
    private onStockCompanyChanged( stockCompany: StockCompany )
    {
        const methodName = 'onStockCompanyChanged';
        this.debug( `${methodName} ${this.column.colId} ${stockCompany.tickerSymbol} ${CachedValueState.getName(stockCompany.cacheState)}` );
        this.modelObject.stockCompany = <any>stockCompany;
    }

    /**
     * This method is called when the stock analyst consensus changes.
     * @param {StockCompany} stockCompany
     */
    private onStockAnalystConsensusChange( stockAnalystConsensus: StockAnalystConsensus )
    {
        const methodName = 'onStockAnalystConsensusChanged';
        this.debug( `${methodName} ${this.column.colId} ${stockAnalystConsensus.tickerSymbol} ${CachedValueState.getName(stockAnalystConsensus.getCacheState())}` );
        this.modelObject.stockAnalystConsensus = <any>stockAnalystConsensus;
    }

    private gainsLossesChanged( gainsLosses: GainsLosses )
    {
        const methodName = 'onGainsLossesChanged';
        this.debug( `${methodName} ${this.column.colId} ${gainsLosses.tickerSymbol} ${CachedValueState.getName(gainsLosses.getCacheState())}` );
        this.modelObject.stockGainsLosses = <any>gainsLosses;
    }
}
