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
 * This class defines the information about a single stock that the customer is tracking in
 * one or more portfolios
 *
 * Created by mike on 11/1/2016.
 */
export class PortfolioStock extends ModelObject<PortfolioStock>
                            implements StockModelObject
{
    public id: string;
    public tickerSymbol: string;
    public portfolioId: string;
    public customerId: string;
    public numberOfShares: number;
    public averageUnitCost: number;
    public stockPriceWhenCreated: number;
    public lastPrice: number;
    public stopLossPrice: number;
    public stopLossShares: number;
    public profitTakingPrice: number;
    public profitTakingShares: number;
    public rank: number;
    public rankPercent: number;

    /*
     * Stock model object properties.
     */
    public stockAnalystConsensus: StockAnalystConsensus;
    public stockCompany: StockCompany;
    public stockGainsLosses: GainsLosses;
    public stockPriceQuote: StockPriceQuote;
    public stockQuote: StockQuote;

    public isEqualPrimaryKey( modelObject: PortfolioStock )
    {
        var isEqual = false;
        if ( modelObject )
        {
            isEqual = this.tickerSymbol === modelObject.tickerSymbol &&
                      this.portfolioId === modelObject.portfolioId;
        }
        return isEqual;
    }

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
        return this.getMarketValue();
    }

    /**
     * Returns the market modelObjectRows of the stock (cost basis * quantity).
     * @return {number}
     */
    public getMarketValue(): number
    {
        return this.averageUnitCost * this.numberOfShares;
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
        let crudTableColumns = new CrudTableColumns( null );
        crudTableColumns.addAll( new CommonStockModelObjectColumns() );
        crudTableColumns.addColumn( {
                                        colId: 'numberOfShares',
                                        header: 'Qty',
                                        dataType: CrudTableColumnType.NUMBER,
                                        field: 'numberOfShares',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'averageUnitCost',
                                        header: 'Avg Price',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'averageUnitCost',
                                        header: 'Avg Price',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'stopLossPrice',
                                        header: 'Stop Loss Price',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'stopLossShares',
                                        header: 'Stop Loss Shares',
                                        dataType: CrudTableColumnType.NUMBER,
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'profitTakingPrice',
                                        header: 'Profit Taking Price',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'profitTakingShares',
                                        header: 'Profit Taking Shares',
                                        dataType: CrudTableColumnType.NUMBER,
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'rank',
                                        header: 'Rank',
                                        dataType: CrudTableColumnType.NUMBER,
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'rankPercent',
                                        header: 'Rank Percent',
                                        dataType: CrudTableColumnType.PERCENT,
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
