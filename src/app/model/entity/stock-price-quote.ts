/**
 * Created by mike on 11/4/2017
 */
import { CachedValueState } from '../../common/cached-value-state.enum';
import { CacheStateContainer } from '../common/cache-state-container';
import { CrudTableColumns } from '../../component/crud/table/crud-table-columns';
import { CrudTableColumnType } from '../../component/crud/table/crud-table-column-type';
import { CrudTableColumnCachedDataType } from '../../component/crud/table/crud-table-column-cached-data-type';

/**
 * This class contains the properties of a price quote.
 */
export class StockPriceQuote implements CacheStateContainer<string>
{
    public tickerSymbol: string;
    public lastPrice: number;
    public cacheState: CachedValueState;
    public cacheError: string;
    public expirationTime: Date;

    public getCacheError(): string
    {
        return this.cacheError;
    }

    public getCacheState(): CachedValueState
    {
        return this.cacheState;
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

    public getCrudTableColumns(): CrudTableColumns
    {
        let crudTableColumns = new CrudTableColumns();
        crudTableColumns.addColumn( {
                                        colId: 'lastPrice',
                                        header: 'Last Price',
                                        dataType: CrudTableColumnType.STRING,
                                        cachedDataType: CrudTableColumnCachedDataType.STOCK_PRICE_QUOTE,
                                        field: 'stockPriceQuote.lastPrice',
                                        sortable: true
                                    } );
        return crudTableColumns;
    }
}
