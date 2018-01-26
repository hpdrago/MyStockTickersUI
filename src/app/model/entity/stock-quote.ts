///<reference path="../common/cache-state-container.ts"/>
import { CachedValueState } from '../../common/cached-value-state.enum';
import { ModelObject } from '../common/model-object';
import { CacheStateContainer } from '../common/cache-state-container';
import { CrudTableColumnType } from '../../component/crud/table/crud-table-column-type';
import { CrudTableColumns } from '../../component/crud/table/crud-table-columns';
import { CrudTableColumnCachedDataType } from '../../component/crud/table/crud-table-column-cached-data-type';

/**
 * This class contains all of the properties for the Stock Quote.
 */
export class StockQuote extends ModelObject<StockQuote>
                        implements CacheStateContainer<string>
{
    public tickerSymbol: string;
    public companyName: string;
    public calculationPrice: string;
    public openPrice: number;
    public closePrice: number;
    public highPrice: number;
    public lowPrice: number;
    public latestPrice: number;
    public latestPriceSource: string;
    public latestPriceTime: string;
    public latestUpdate: number;
    public latestVolume: number;
    public thirtyDayAvgVolume: number;
    public changeAmount: number;
    public delayedPrice: number;
    public delayedPriceTime: number;
    public previousClose: number;
    public changePercent: number;
    public marketCap: number;
    public peRatio: number;
    public week52High: number;
    public week52Low: number;
    public week52Change: number;
    public ytdChangePercent: number;
    public lastQuoteRequestDate: Date;
    public discontinuedInd;
    public cacheState: CachedValueState;
    public cacheError: string;
    public expirationTime: Date;

    public getPrimaryKeyName(): string
    {
        return "ticker_symbol";
    }

    public getPrimaryKeyValue(): any
    {
        this.tickerSymbol;
    }
    public getExpirationTime(): Date
    {
        return this.expirationTime;
    }

    public getKey(): string
    {
        return this.tickerSymbol;
    }

    public setCacheError( error: string )
    {
        this.cacheError = error;
    }

    public setCacheState( cacheValueState: CachedValueState )
    {
        this.cacheState = cacheValueState;
    }

    public getCacheError(): string
    {
        return this.cacheError
    }

    public getCacheState(): CachedValueState
    {
        return this.cacheState;
    }

    public getCrudTableColumns(): CrudTableColumns
    {
        let crudTableColumns = new CrudTableColumns( null );
        crudTableColumns.addColumn( {
                                        colId: 'companyName',
                                        header: 'Company Name',
                                        dataType: CrudTableColumnType.STRING,
                                        cachedDataType: CrudTableColumnCachedDataType.STOCK_QUOTE,
                                        field: 'companyName',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'openPrice',
                                        header: 'Open Price',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        cachedDataType: CrudTableColumnCachedDataType.STOCK_QUOTE,
                                        field: 'openPrice',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'closePrice',
                                        header: 'Close Price',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        cachedDataType: CrudTableColumnCachedDataType.STOCK_QUOTE,
                                        field: 'closePrice',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'highPrice',
                                        header: 'High Price',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        cachedDataType: CrudTableColumnCachedDataType.STOCK_QUOTE,
                                        field: 'highPrice',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'lowPrice',
                                        header: 'Low Price',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        cachedDataType: CrudTableColumnCachedDataType.STOCK_QUOTE,
                                        field: 'lowPrice',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'volume',
                                        header: 'Volume',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        cachedDataType: CrudTableColumnCachedDataType.STOCK_QUOTE,
                                        field: 'latestVolume',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'thirtyDateAvgVolume',
                                        header: '30 day Avg Vol.',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        cachedDataType: CrudTableColumnCachedDataType.STOCK_QUOTE,
                                        field: 'thirtyDayAvgVolume',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'changeAmount',
                                        header: 'Change Amount',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        cachedDataType: CrudTableColumnCachedDataType.STOCK_QUOTE,
                                        field: 'changeAmount',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'changePercent',
                                        header: 'Change Percent',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        cachedDataType: CrudTableColumnCachedDataType.STOCK_QUOTE,
                                        field: 'changePercent',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'previousClose',
                                        header: 'Prev Close',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        cachedDataType: CrudTableColumnCachedDataType.STOCK_QUOTE,
                                        field: 'previousClose',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'marketCap',
                                        header: 'Market Cap',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        cachedDataType: CrudTableColumnCachedDataType.STOCK_QUOTE,
                                        field: 'marketCap',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'peRation',
                                        header: 'P/E Ratio',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        cachedDataType: CrudTableColumnCachedDataType.STOCK_QUOTE,
                                        field: 'peRatio',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'week52High',
                                        header: '52w High',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        cachedDataType: CrudTableColumnCachedDataType.STOCK_QUOTE,
                                        field: 'week52High',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'week52Low',
                                        header: '52w Low',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        cachedDataType: CrudTableColumnCachedDataType.STOCK_QUOTE,
                                        field: 'week52Low',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'week52Change',
                                        header: '52w Change',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        cachedDataType: CrudTableColumnCachedDataType.STOCK_QUOTE,
                                        field: 'week52Change',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'week52ChangePercent',
                                        header: '52w Change %',
                                        dataType: CrudTableColumnType.PERCENT,
                                        cachedDataType: CrudTableColumnCachedDataType.STOCK_QUOTE,
                                        field: 'ytdChangePercent',
                                        sortable: true
                                    } );
        return crudTableColumns;
    }
}
