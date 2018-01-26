import { StockModelObject } from '../common/stock-model-object';
import { CrudTableColumns } from '../../component/crud/table/crud-table-columns';
import { CrudTableColumnType } from '../../component/crud/table/crud-table-column-type';

/**
 * This class defines the information about a single stock that the customer is tracking in
 * one or more portfolios
 *
 * Created by mike on 11/1/2016.
 */
export class PortfolioStock extends StockModelObject<PortfolioStock>
{
    public id: string;
    public portfolioId: string;
    public customerId: string;
    public numberOfShares: number;
    public averageUnitCost: number;
    public lastPrice: number;
    public stopLossPrice: number;
    public stopLossShares: number;
    public profitTakingPrice: number;
    public profitTakingShares: number;
    public rank: number;
    public rankPercent: number;

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

    /*public numberOfShares: number;
    public averageUnitCost: number;
    public lastPrice: number;
    public realizedGains: number;
    public realizedLosses: number;
    public stopLossPrice: number;
    public stopLossShares: number;
    public profitTakingPrice: number;
    public profitTakingShares: number;
    private rank: number;
    private rankPercent: number;
    */
    public getDefaultCrudTableColumns(): CrudTableColumns
    {
        let crudTableColumns = new CrudTableColumns( null );
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
        return crudTableColumns;
    }
}
