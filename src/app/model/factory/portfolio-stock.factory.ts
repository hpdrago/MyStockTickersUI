import { PortfolioStock } from "../entity/portfolio-stock";
import { ModelObjectFactory } from "./model-object.factory";
import { Injectable } from "@angular/core";
import { SessionService } from "../../service/session.service";

/**
 * This class provides factory methods for the StockCompany ModelObject.
 *
 * Created by mike on 12/13/2016.
 */
@Injectable()
export class PortfolioStockFactory extends ModelObjectFactory<PortfolioStock>
{
    constructor( protected session: SessionService )
    {
        super();
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
        portfolioStock.customerId = this.session.getLoggedInUserId();
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
