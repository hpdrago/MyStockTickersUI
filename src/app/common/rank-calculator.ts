import { StockTableEntry } from '../model/common/stock-table-entry';

/**
 * This class take an set of {@code StockTableEntry}s and calculations the rank and rank percent of each stock
 * compared to the set.
 */
export class RankCalculator
{
    public calculateRank( stocks: StockTableEntry[] )
    {
        this.calculateRankPercentage( stocks );
        this.sortByRankPercentDescending( stocks );
        this.setRank( stocks );
    }

    /**
     * Calculats the rank percent for each stock table entry.
     * @param {StockTableEntry[]} stocks
     */
    private calculateRankPercentage( stocks: StockTableEntry[] ): void
    {
        let totalMarketValue = this.calculateTotalMarketValue( stocks );
        stocks.forEach( ( stockTableEntry: StockTableEntry ) =>
                        {
                            stockTableEntry.setRankPercent( (stockTableEntry.getMarketValue() / totalMarketValue) * 100 );
                        } );
    }

    /**
     * Calculates the total market value from each of the StockTableEntry instancecs.
     * @param {StockTableEntry[]} stocks
     * @return {number}
     */
    private calculateTotalMarketValue( stocks: StockTableEntry[] ): number
    {
        let totalMarketValue: number = 0;
        stocks.forEach( (stockTableEntry: StockTableEntry) => totalMarketValue += stockTableEntry.getMarketValue() );
        return totalMarketValue
    }

    /**
     * Sorts the stock table entry in descending order by the rank percent.
     * @param {StockTableEntry[]} stocks
     */
    private sortByRankPercentDescending( stocks: StockTableEntry[] ): void
    {
        stocks.sort( (a: StockTableEntry, b: StockTableEntry) =>
                     {
                         if ( a.getRankPercent() > b.getRankPercent() )
                         {
                             return -1;
                         }
                         else if ( a.getRankPercent() === b.getRankPercent() )
                         {
                             return 0;
                         }
                         return 1;
                     });
    }

    /**
     * Sets the rank of the stocks.  Assumes that the stocks are sorted in descending rank percent order.
     * @param {StockTableEntry[]} stocks
     */
    private setRank( stocks: StockTableEntry[] ): void
    {
        let rank = 1;
        stocks.forEach( (stockTableEntry: StockTableEntry) => stockTableEntry.setRank( rank++ ));
    }
}
