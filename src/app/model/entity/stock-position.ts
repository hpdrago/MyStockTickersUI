import { StockTableEntry } from '../common/stock-table-entry';
import { StockModelObject } from '../common/stock-model-object';
import { StockQuoteContainer } from '../common/stock-quote-container';
import { StockPriceQuoteContainer } from '../common/stock-price-quote-container';

/**
 * This class contains the information for a single stock position within a LinkedAccount.
 */
export class StockPosition extends StockModelObject<StockPosition>
                           implements StockTableEntry,
                                      StockQuoteContainer,
                                      StockPriceQuoteContainer
{
    public id: string;
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
        return this.quantity * this.stockPriceQuote.lastPrice;
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
