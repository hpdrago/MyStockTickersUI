import { StockNotesContainer } from "../common/stock-notes-container";
import { StockNotesSourceContainer } from "../common/stock-notes-source-container";
import { StockModelObject } from '../common/stock-model-object';
import { StockCompany } from './stock-company';
import { CrudTableColumns } from '../../component/crud/table/crud-table-columns';
import { CrudTableColumnType } from '../../component/crud/table/crud-table-column-type';
import { CacheStateContainer } from '../common/cache-state-container';
import { CachedValueState } from '../../common/cached-value-state.enum';

/**
 * This entity contains the elements for the stock summary
 *
 * Created 10/17/2017
 */
export class StockAnalystConsensus extends StockModelObject<StockAnalystConsensus>
                                   implements StockNotesContainer,
                                              StockNotesSourceContainer,
                                              CacheStateContainer<string>
{
    public id: string;
    public customerId: string;
    public comments: string;
    public analystStrongBuyCount: number;
    public analystBuyCount: number;
    public analystHoldCount: number;
    public analystUnderPerformCount: number;
    public analystSellCount: number;
    public analystSentimentDate: Date;
    public avgAnalystPriceTarget: number;
    public lowAnalystPriceTarget: number;
    public highAnalystPriceTarget: number;
    public analystPriceDate: Date;
    public notesSourceId: string;
    public notesSourceName: string;
    public cacheState: CachedValueState;
    public cacheError: string;

    public getNotes(): string
    {
        return this.comments;
    }

    public getNotesSourceId(): string
    {
        return this.notesSourceId;
    }

    public setNotesSourceId( notesSourceId: string )
    {
        this.notesSourceId = notesSourceId;
    }

    public getNotesSourceName(): string
    {
        return this.notesSourceName;
    }

    public setNotesSourceName( notesSourceName: string )
    {
        this.notesSourceName = notesSourceName;
    }

    public getPrimaryKeyValue(): any
    {
        return this.id;
    }

    public getPrimaryKeyName(): string
    {
        return "id";
    }

    public getStockCompany(): StockCompany
    {
        return this.stockCompany;
    }

    public setStockCompany( stockCompany: StockCompany )
    {
        this.stockCompany = stockCompany;
    }

    public getDefaultCrudTableColumns(): CrudTableColumns
    {
        let crudTableColumns: CrudTableColumns = super.getDefaultCrudTableColumns();
        crudTableColumns.addColumn( {
                                        colId: 'analystSentimentDate',
                                        header: 'Sentiment Date',
                                        dataType: CrudTableColumnType.DATE,
                                        field: 'analystSentimentDate',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'lowAnalystPriceTarget',
                                        header: 'Low Price Target',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        field: 'lowAnalystPriceTarget',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'avgAnalystPriceTarget',
                                        header: 'Avg Price Target',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        field: 'avgAnalystPriceTarget',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'highAnalystPriceTarget',
                                        header: 'High Price Target',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        field: 'highAnalystPriceTarget',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'analystPriceDate',
                                        header: 'Price Date',
                                        dataType: CrudTableColumnType.DATE,
                                        field: 'analystPriceDate',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'notesSource',
                                        header: 'Source',
                                        dataType: CrudTableColumnType.STRING,
                                        field: 'notesSource',
                                        sortable: true
                                    } );
        return crudTableColumns;
    }

    public getExpirationTime(): Date
    {
        // never expires
        return new Date(8640000000000000);
    }

    public setKey( key: any )
    {
        this.tickerSymbol = key;
    }

    public getKey(): string
    {
        return this.tickerSymbol;
    }

    public setCacheError( cacheError: string )
    {
        this.cacheError = cacheError;
    }

    public getCacheError(): string
    {
        return this.cacheError;
    }

    public setCacheState( cacheState: CachedValueState )
    {
        this.cacheState = cacheState;
    }

    public getCacheState(): CachedValueState
    {
        return this.cacheState;
    }

}
