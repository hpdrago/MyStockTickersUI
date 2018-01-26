import { ModelObject } from "../common/model-object";
import { CachedValueState } from '../../common/cached-value-state.enum';
import { CacheStateContainer } from '../common/cache-state-container';
import { CrudTableColumnType } from '../../component/crud/table/crud-table-column-type';
import { CrudTableColumns } from '../../component/crud/table/crud-table-columns';
import { CrudTableColumnCachedDataType } from '../../component/crud/table/crud-table-column-cached-data-type';

/**
 * This class defines the fields and methods for a single StockCompany
 * Created by mike on 9/12/2016.
 */
export class StockCompany extends ModelObject<StockCompany> implements CacheStateContainer<string>
{
    public tickerSymbol: string;
    public companyName: string;
    public lastPrice: number;
    public cacheError: string;
    public cacheState: CachedValueState;
    public expirationTime: Date;
    public sector: string;
    public industry: string;

    public getPrimaryKeyValue(): any
    {
        return this.tickerSymbol;
    }

    public getPrimaryKeyName(): string
    {
        return "tickerSymbol";
    }

    public getCacheError(): string
    {
        return this.cacheError
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

    public setCacheError( cacheError: string )
    {
        this.cacheError = cacheError;
    }

    public setCacheState( cacheState: CachedValueState )
    {
        this.cacheState = cacheState;
    }

    public setKey( key: any )
    {
        return this.tickerSymbol;
    }

    public getDefaultColumns(): CrudTableColumns
    {
        let crudTableColumns = super.getDefaultColumns();
        crudTableColumns.addColumn( {
                                        colId: 'companyName',
                                        header: 'Company Name',
                                        dataType: CrudTableColumnType.STRING,
                                        cachedDataType: CrudTableColumnCachedDataType.STOCK_COMPANY,
                                        field: 'companyName',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'sector',
                                        header: 'Sector',
                                        dataType: CrudTableColumnType.STRING,
                                        cachedDataType: CrudTableColumnCachedDataType.STOCK_COMPANY,
                                        field: 'sector',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'industry',
                                        header: 'Industry',
                                        dataType: CrudTableColumnType.STRING,
                                        cachedDataType: CrudTableColumnCachedDataType.STOCK_COMPANY,
                                        field: 'industry',
                                        sortable: true
                                    } );
        return crudTableColumns;
    }
}
