import { PortfolioStock } from "../entity/portfolio-stock";
import { ModelObjectFactory } from "./model-object.factory";
import { Injectable } from "@angular/core";

/**
 * This class provides factory methods for the Stock ModelObject.
 *
 * Created by mike on 12/13/2016.
 */
@Injectable()
export class PortfolioStockFactory extends ModelObjectFactory<PortfolioStock>
{
    /**
     * Create a new PortfolioStock instance
     * @returns {PortfolioStock}
     */
    newModelObject(): PortfolioStock
    {
        var portfolioStock = new PortfolioStock();
        portfolioStock.tickerSymbol = '';
        portfolioStock.companyName = '';
        portfolioStock.numberOfShares = 0;
        portfolioStock.averageUnitCost = 0;
        portfolioStock.lastPrice = 0;
        portfolioStock.sector = '';
        portfolioStock.subSector = '';
        portfolioStock.realizedGains = 0;
        portfolioStock.realizedLosses = 0;
        portfolioStock.stopLossPrice = 0;
        portfolioStock.stopLossShares = 0;
        portfolioStock.profitTakingPrice = 0;
        portfolioStock.profitTakingShares = 0;
        return portfolioStock;
    }

}
