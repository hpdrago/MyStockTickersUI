import { ModelObjectFactory } from "./model-object.factory";
import { StockAnalystConsensus } from "../entity/stock-analyst-consensus";
import { SessionService } from "../../service/session.service";
import { Injectable } from "@angular/core";

@Injectable()
export class StockAnalystConsensusFactory extends ModelObjectFactory<StockAnalystConsensus>
{
    constructor( protected session: SessionService )
    {
        super();
    }

    public newModelObject(): StockAnalystConsensus
    {
        var stockAnalystConsensus: StockAnalystConsensus = new StockAnalystConsensus();
        stockAnalystConsensus.id = '';
        stockAnalystConsensus.customerId = this.session.getLoggedInUserId();
        stockAnalystConsensus.tickerSymbol = '';
        stockAnalystConsensus.companyName = '';
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
        stockAnalystConsensus.lastPrice = 0;
        stockAnalystConsensus.lastPriceChange = null;
        return stockAnalystConsensus;
    }
}
