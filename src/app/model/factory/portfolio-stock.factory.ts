import { PortfolioStock } from "../entity/portfolio-stock";
import { Injectable } from "@angular/core";
import { SessionService } from "../../service/session.service";
import { StockModelObjectFactory } from './stock-model-object.factory';
import { StockQuoteFactory } from './stock-quote.factory';
import { StockPriceQuoteFactory } from './stock-price-quote.factory';

/**
 * This class provides factory methods for the StockCompany ModelObject.
 *
 * Created by mike on 12/13/2016.
 */
@Injectable()
export class PortfolioStockFactory extends StockModelObjectFactory<PortfolioStock>
{
    /**
     * Constructor.
     * @param {SessionService} session
     * @param {StockQuoteFactory} stockQuoteFactory
     * @param {StockPriceQuoteFactory} stockPriceQuoteFactory
     */
    public constructor( protected session: SessionService,
                           protected stockQuoteFactory: StockQuoteFactory,
                           protected stockPriceQuoteFactory: StockPriceQuoteFactory )
    {
        super( session, stockQuoteFactory, stockPriceQuoteFactory );
    }

    /**
     * Create a new PortfolioStock instance
     * @returns {PortfolioStock}
     */
    newModelObject(): PortfolioStock
    {
        var portfolioStock = new PortfolioStock();
        portfolioStock.tickerSymbol = '';
        portfolioStock.customerId = this.session.getLoggedInUserId();
        portfolioStock.stopLossPrice = 0;
        portfolioStock.stopLossShares = 0;
        portfolioStock.profitTakingPrice = 0;
        portfolioStock.profitTakingShares = 0;
        portfolioStock.initializeStockModelObjects();
        return portfolioStock;
    }

}
