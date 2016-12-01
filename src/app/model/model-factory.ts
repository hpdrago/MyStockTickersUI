/**
 * Created by mike on 11/16/2016.
 */
import { Stock } from "./stock";
import { Injectable } from "@angular/core";
import { PortfolioStock } from "./portfolio-stock";

export class ModelFactory
{
    /**
     * Create a new Stock instance
     * @returns {Stock}
     */
    public static newStockInstance(): Stock
    {
        return new Stock( '', '', 0, '', 0, false );
    }

    /**
     * Create a new Stock instance from non-stock class that has the same properties
     * @param stock
     * @returns {Stock}
     */
    public static newStockInstanceFromEvent( stock: any ): Stock
    {
        return new Stock( stock.tickerSymbol,
                          stock.companyName,
                          stock.lastPrice,
                          stock.exchange,
                          stock.createdBy,
                          stock.userEntered );
    }

    /**
     * Create a new PortfolioStock instance
     * @returns {PortfolioStock}
     */
    public static newPortfolioStockInstance(): PortfolioStock
    {
        var portfolioStock = new PortfolioStock();
        portfolioStock.tickerSymbol = '';
        portfolioStock.companyName = '';
        portfolioStock.numberOfShares = 0;
        portfolioStock.costBasis = 0;
        portfolioStock.lastPrice = 0;
        portfolioStock.sector = '';
        portfolioStock.subSector = '';
        portfolioStock.realizedGain = 0;
        portfolioStock.realizedLoss = 0;
        portfolioStock.stopLossPrice = 0;
        portfolioStock.stopLossShares = 0;
        portfolioStock.profitTakingPrice = 0;
        portfolioStock.profitTakingShares = 0;
        return portfolioStock;
    }
}
