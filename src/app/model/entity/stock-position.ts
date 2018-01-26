import { StockModelObject } from '../common/stock-model-object';
import { CrudTableColumns } from '../../component/crud/table/crud-table-columns';
import { CrudTableColumnType } from '../../component/crud/table/crud-table-column-type';
import { StockAnalystConsensus } from './stock-analyst-consensus';
import { StockCompany } from './stock-company';
import { GainsLosses } from './gains-losses';
import { StockPriceQuote } from './stock-price-quote';
import { StockQuote } from './stock-quote';
import { ModelObject } from '../common/model-object';
import { CommonStockModelObjectColumns } from '../../component/stock-table/common-stock-model-object-columns';

/**
 * This class contains the information for a single stock position within a LinkedAccount.
 */
export class StockPosition extends ModelObject<StockPosition>
                           implements StockModelObject
{
    public id: string;
    public tickerSymbol: string;
    public customerId: string;
    public tradeItAccountId: string;
    public linkedAccountId: string;
    public symbolClass: string;
    public costBasis: number;
    public holdingType: string;
    public quantity: number;
    public todayGainLossAbsolute: number;
    public todayGainLossPercentage: number;
    public totalGainLossAbsolute: number;
    public totalGainLossPercentage: number;
    public exchange: string;
    public openPrice: number;
    public closePrice: number;
    public version: number;
    public rank: number;
    public rankPercent: number;
    public stockPriceWhenCreated: number;

    /*
     * Stock model object properties.
     */
    public stockAnalystConsensus: StockAnalystConsensus;
    public stockCompany: StockCompany;
    public stockGainsLosses: GainsLosses;
    public stockPriceQuote: StockPriceQuote;
    public stockQuote: StockQuote;

    public getPrimaryKeyValue(): any
    {
        return this.id;
    }

    public getPrimaryKeyName(): string
    {
        return "id";
    }

    /**
     * The market modelObjectRows is shares(quantity) * current price
     * @return {number}
     */
    public marketValue(): number
    {
        return this.quantity * this.stockPriceQuote.lastPrice;
    }

    /**
     * Returns the market modelObjectRows of the stock (cost basis * quantity).
     * @return {number}
     */
    public getMarketValue(): number
    {
        return this.costBasis * this.quantity;
    }

    /**
     * Returns the rank of this stock compared to a set of stocks.
     * @return {number}
     */
    public getRank(): number
    {
        return this.rank;
    }

    /**
     * Returns the rank percent of this stock compared to a set of stocks.
     * @return {number}
     */
    public getRankPercent(): number
    {
        return this.rankPercent;
    }

    /**
     * Set the rank of this stock compared to a set of stocks.
     * @param {number} rank
     */
    public setRank( rank: number )
    {
        this.rank = rank;
    }

    /**
     * Set the rank percent of this stock compared to a set of stocks.
     * @param {number} rankPercent
     */
    public setRankPercent( rankPercent: number )
    {
        this.rankPercent = rankPercent;
    }

    public getDefaultCrudTableColumns(): CrudTableColumns
    {
        let crudTableColumns = new CrudTableColumns(null);
        crudTableColumns.addColumn( {
                                        colId: 'tickerSymbol',
                                        header: 'Ticker Symbol',
                                        dataType: CrudTableColumnType.STRING,
                                        field: 'tickerSymbol',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'quantity',
                                        header: 'Shares',
                                        dataType: CrudTableColumnType.NUMBER,
                                        field: 'quantity',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'rank',
                                        header: 'Rank',
                                        dataType: CrudTableColumnType.NUMBER,
                                        field: 'rank',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'rankPercent',
                                        header: 'Rank %',
                                        dataType: CrudTableColumnType.PERCENT,
                                        field: 'rankPercent',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'lastPrice',
                                        header: 'Last Price',
                                        dataType: CrudTableColumnType.CUSTOM,
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'costBasis',
                                        header: 'Cost Basis',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        field: 'costBasis',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'openPrice',
                                        header: 'Open',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        field: 'openPrice',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'closePrice',
                                        header: 'Close',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        field: 'closePrice',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'todayGainLossAbsolute',
                                        header: 'Day G/L $',
                                        dataType: CrudTableColumnType.GAIN_LOSS_CURRENCY,
                                        field: 'todayGainLossAbsolute',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'todayGainLossPercentage',
                                        header: 'Day G/L %',
                                        dataType: CrudTableColumnType.GAIN_LOSS_CURRENCY,
                                        field: 'todayGainLossPercentage',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'totalGainLossAbsolute',
                                        header: 'G/L $',
                                        dataType: CrudTableColumnType.GAIN_LOSS_CURRENCY,
                                        field: 'totalGainLossAbsolute',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'totalGainLossPercentage',
                                        header: 'G/L %',
                                        dataType: CrudTableColumnType.GAIN_LOSS_CURRENCY,
                                        field: 'totalGainLossPercentage',
                                        sortable: true
                                    } );
        return crudTableColumns;
    }

    public initializeStockModelObjects()
    {
        this.stockPriceQuote = new StockPriceQuote();
        this.stockQuote = new StockQuote();
        this.stockCompany = new StockCompany();
        this.stockGainsLosses = new GainsLosses();
        this.stockAnalystConsensus = new StockAnalystConsensus();
    }
}
