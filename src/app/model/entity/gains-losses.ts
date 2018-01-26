import { ModelObject } from '../common/model-object';
import { TickerSymbolContainer } from '../common/ticker-symbol-container';
import { StockCompanyContainer } from '../common/stock-company-container';
import { StockCompany } from './stock-company';
import { LinkedAccount } from './linked-account';
import { StockQuoteContainer } from '../common/stock-quote-container';
import { StockQuote } from './stock-quote';
import { CrudTableColumns } from '../../component/crud/table/crud-table-columns';
import { CrudTableColumnType } from '../../component/crud/table/crud-table-column-type';
import { CacheStateContainer } from '../common/cache-state-container';
import { CachedValueState } from '../../common/cached-value-state.enum';

/**
 * This entity contains the elements for gains and losses.
 *
 * Created 05/29/2018
 */
export class GainsLosses extends ModelObject<GainsLosses>
                         implements TickerSymbolContainer,
                                    StockCompanyContainer,
                                    StockQuoteContainer,
                                    CacheStateContainer<string>
{
    public id: string;
    public customerId: string;
    public tickerSymbol: string;
    public gains: number;
    public losses: number;
    public totalGainsLosses: number;
    public linkedAccount: LinkedAccount;
    public stockCompany: StockCompany;
    public stockQuote: StockQuote;
    public cacheState: CachedValueState;
    public cacheError: string;

    public getTickerSymbol(): string
    {
        return this.tickerSymbol;
    }

    public setTickerSymbol( tickerSymbol: string )
    {
        this.tickerSymbol = tickerSymbol;
    }

    public isEqualPrimaryKey( modelObject: GainsLosses ): boolean
    {
        return modelObject.id === this.id;
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
        let crudTableColumns = new CrudTableColumns( null );
        crudTableColumns.addColumn( {
                                        colId: 'tickerSymbol',
                                        header: 'Ticker',
                                        dataType: CrudTableColumnType.STRING,
                                        field: 'tickerSymbol',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'gains',
                                        header: 'Gains',
                                        dataType: CrudTableColumnType.GAIN_LOSS_CURRENCY,
                                        field: 'gains',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'losses',
                                        header: 'Losses',
                                        dataType: CrudTableColumnType.GAIN_LOSS_CURRENCY,
                                        field: 'losses',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'totalGainsLosses',
                                        header: 'Total G/L',
                                        dataType: CrudTableColumnType.GAIN_LOSS_CURRENCY,
                                        field: 'totalGainsLosses',
                                        sortable: true
                                    } );
        return crudTableColumns;
    }

    public getOtherCrudTableColumns(): CrudTableColumns
    {
        let crudTableColumns = super.getOtherCrudTableColumns();
        crudTableColumns.addAll( new LinkedAccount().getDefaultCrudTableColumns() )
        crudTableColumns.addAll( new StockCompany().getDefaultCrudTableColumns() )
        crudTableColumns.addAll( new StockQuote().getDefaultCrudTableColumns() )
        return crudTableColumns;
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
        return new Date(8640000000000000);
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

    public setKey( key: string )
    {
        this.tickerSymbol = key;
    }

}
