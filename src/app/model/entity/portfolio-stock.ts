import { StockModelObject } from '../common/stock-model-object';

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
    public sector: string;
    public subSector: string;
    public realizedGains: number;
    public realizedLosses: number;
    public stopLossPrice: number;
    public stopLossShares: number;
    public profitTakingPrice: number;
    public profitTakingShares: number;
    private rank: number;
    private rankPercent: number;

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
     * The market value is shares(quantity) * current price
     * @return {number}
     */
    public marketValue(): number
    {
        return this.getMarketValue();
    }

    /**
     * Returns the market value of the stock (cost basis * quantity).
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
}
