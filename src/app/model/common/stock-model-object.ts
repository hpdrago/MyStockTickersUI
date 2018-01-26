import { ModelObject } from "./model-object";
import { StockPriceQuote } from '../entity/stock-price-quote';
import { StockQuote } from '../entity/stock-quote';
import { StockPriceQuoteContainer } from './stock-price-quote-container';
import { StockQuoteContainer } from './stock-quote-container';
import { CrudTableColumns } from '../../component/crud/table/crud-table-columns';
import { CrudTableColumnType } from '../../component/crud/table/crud-table-column-type';
import { isNullOrUndefined } from 'util';
import { StockCompany } from '../entity/stock-company';
import { StockCompanyContainer } from './stock-company-container';
import { GainsLosses } from '../entity/gains-losses';
import { StockAnalystConsensus } from '../entity/stock-analyst-consensus';
import { StockAnalystConsensusContainer } from './stock-analyst-consensus-container';

/**
 * This is the base class for all ModelObjects that contains a ticker symbol, stock quote, and stock price quote
 */
export abstract class StockModelObject<T extends ModelObject<T>> extends ModelObject<T>
                                                                 implements StockPriceQuoteContainer,
                                                                            StockQuoteContainer,
                                                                            StockCompanyContainer,
                                                                            StockAnalystConsensusContainer
{
    public tickerSymbol: string;
    public stockPriceWhenCreated: number;
    public stockPriceQuote: StockPriceQuote;
    public stockQuote: StockQuote;
    public stockCompany: StockCompany;
    public stockGainsLosses: GainsLosses;
    public stockAnalystConsensus: StockAnalystConsensus;

    /**
     * Get the ticker symbol
     * @returns {string}
     */
    public getTickerSymbol(): string
    {
        return this.tickerSymbol;
    }

    public setTickerSymbol( tickerSymbol: string )
    {
        this.tickerSymbol = tickerSymbol;
    }

    public getStockPriceQuote(): StockPriceQuote
    {
        return this.stockPriceQuote;
    }

    public getStockQuote(): StockQuote
    {
        return this.stockQuote;
    }

    public setStockPriceQuote( stockPriceQuote: StockPriceQuote )
    {
        this.stockPriceQuote = stockPriceQuote;
    }

    public setStockQuote( stockQuote: StockQuote )
    {
        this.stockQuote = stockQuote;
    }

    public getLastPrice(): number
    {
        return this.getStockPriceQuote()
                   .lastPrice;
    }

    /**
     * Returns the available crudTableColumns.
     * @return {CrudTableColumns}
     */
    public getDefaultCrudTableColumns(): CrudTableColumns
    {
        let crudTableColumns = new CrudTableColumns( [] );
        if ( isNullOrUndefined( this.stockPriceQuote ))
        {
            this.stockPriceQuote = new StockPriceQuote();
        }
        crudTableColumns.addColumn( {
                                        colId: 'tickerSymbol',
                                        header: 'Ticker Symbol',
                                        dataType: CrudTableColumnType.STRING,
                                        field: 'tickerSymbol',
                                        sortable: true
                                    } );
        /*
         * Add the stock price quote information
         */
        crudTableColumns.addAll( this.stockPriceQuote.getCrudTableColumns() );
        crudTableColumns.addColumn( {
                                        colId: 'stockPriceWhenCreated',
                                        header: 'Stock Price When Entered',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        field: 'stockPriceWhenCreated',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'percentChangeSinceCreated',
                                        header: '% Changed Since Entered',
                                        dataType: CrudTableColumnType.CUSTOM,
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'avgAnalystPriceTarget',
                                        header: 'Avg Analyst PT',
                                        dataType: CrudTableColumnType.CUSTOM,
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'avgUpsidePercent',
                                        header: 'Avg Upside %',
                                        dataType: CrudTableColumnType.CUSTOM,
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'analystConsensus',
                                        header: 'Analyst Consensus',
                                        dataType: CrudTableColumnType.CUSTOM,
                                        sortable: true
                                    } );
        return crudTableColumns;
    }

    /**
     * Get the stock quote crudTableColumns.
     * @return {CrudTableColumns}
     */
    public getOtherCrudTableColumns(): CrudTableColumns
    {
        let crudTableColumns: CrudTableColumns = super.getOtherCrudTableColumns();
        if ( isNullOrUndefined( this.stockQuote ))
        {
            this.stockQuote = new StockQuote();
        }
        crudTableColumns.addAll( this.stockQuote.getDefaultCrudTableColumns() );
        if ( isNullOrUndefined( this.stockCompany ))
        {
            this.stockCompany = new StockCompany();
        }
        crudTableColumns.addAll( this.stockCompany.getDefaultCrudTableColumns() );
        if ( isNullOrUndefined( this.stockGainsLosses ))
        {
            this.stockGainsLosses = new GainsLosses();
        }
        crudTableColumns.addAll( this.stockGainsLosses.getDefaultCrudTableColumns() );
        return crudTableColumns;
    }
}
