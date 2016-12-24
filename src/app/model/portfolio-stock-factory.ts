import { PortfolioStock } from "./portfolio-stock";
import { ModelObjectFactory } from "./model-object-factory";
import { Injectable } from "@angular/core";

/**
 * Created by mike on 12/13/2016.
 */
@Injectable()
export class PortfolioStockFactory implements ModelObjectFactory<PortfolioStock>
{
    newModelObjectFromEvent( event ): PortfolioStock
    {
        return undefined;
    }

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
