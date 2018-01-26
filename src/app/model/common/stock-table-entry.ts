/**
 * This interface defines the necessary methods that a class must implement in order for it to be to display the
 * rank and rank percent values in a table of other stock entities.
 */
export interface StockTableEntry
{
    /**
     * Returns the market modelObjectRows of the stock.
     * @return {number}
     */
    getMarketValue(): number;

    /**
     * Sets the rank in market values of this stock compared to a set of stocks.
     * @param {number} rank
     */
    setRank( rank: number );

    /**
     * Get the rank.
     * @return {number}
     */
    getRank(): number;

    /**
     * Set the rank percentage of the stock compared to a set of stocks.
     * @param {number} percent
     */
    setRankPercent( percent: number )

    /**
     * Gets the rank percent.
     * @return {number}
     */
    getRankPercent(): number;
}
