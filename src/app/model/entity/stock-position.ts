import { StockPriceQuoteModelObject } from '../common/stock-price-quote-model-object';
import { StockTableEntry } from '../common/stock-table-entry';

/**
 * This class contains the information for a single stock position within a LinkedAccount.
 */
export class StockPosition extends StockPriceQuoteModelObject<StockPosition>
                           implements StockTableEntry
{
    public id: string;
    public customerId: string;
    public tradeItAccountId: string;
    public linkedAccountId: string;
    public tickerSymbol: string;
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
    private rank: number;
    private rankPercent: number;

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
        return this.quantity * this.lastPrice;
    }

    /**
     * Returns the market value of the stock (cost basis * quantity).
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
}
