import { StockAnalystConsensus } from "../entity/stock-analyst-consensus";
import { SessionService } from "../../service/session.service";
import { Injectable } from "@angular/core";
import { StockPriceQuoteFactory } from './stock-price-quote.factory';
import { StockQuoteFactory } from './stock-quote.factory';
import { StockModelObjectFactory } from './stock-model-object.factory';
import { StockCompanyFactory } from './stock-company-factory';

@Injectable()
export class StockAnalystConsensusFactory extends StockModelObjectFactory<StockAnalystConsensus>
{
    /**
     * Constructor.
     * @param {SessionService} session
     * @param {StockPriceQuoteFactory} stockPriceQuoteFactory
     * @param {StockQuoteFactory} stockQuoteFactory
     */
    constructor( protected session: SessionService,
                 protected stockPriceQuoteFactory: StockPriceQuoteFactory,
                 protected stockQuoteFactory: StockQuoteFactory,
                 protected stockCompanyFactory: StockCompanyFactory )
    {
        super( session, stockQuoteFactory, stockPriceQuoteFactory );
    }

    public newModelObject(): StockAnalystConsensus
    {
        var stockAnalystConsensus: StockAnalystConsensus = new StockAnalystConsensus();
        stockAnalystConsensus.id = '';
        stockAnalystConsensus.customerId = this.session.getLoggedInUserId();
        stockAnalystConsensus.tickerSymbol = '';
        stockAnalystConsensus.comments = '';
        stockAnalystConsensus.analystStrongBuyCount = 0;
        stockAnalystConsensus.analystBuyCount = 0;
        stockAnalystConsensus.analystHoldCount = 0;
        stockAnalystConsensus.analystUnderPerformCount = 0;
        stockAnalystConsensus.analystSellCount = 0;
        stockAnalystConsensus.analystSentimentDate = null;
        stockAnalystConsensus.avgAnalystPriceTarget = 0;
        stockAnalystConsensus.lowAnalystPriceTarget = 0;
        stockAnalystConsensus.highAnalystPriceTarget = 0;
        stockAnalystConsensus.analystPriceDate = null;
        stockAnalystConsensus.setStockPriceQuote( this.stockPriceQuoteFactory.newModelObject() );
        stockAnalystConsensus.setStockQuote( this.stockQuoteFactory.newModelObject() );
        return stockAnalystConsensus;
    }
}
