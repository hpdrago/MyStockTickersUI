
import { ModelObjectFactory } from "./model-object.factory";
import { StockAnalytics } from "../entity/stock-analytics";
import { SessionService } from "../../service/crud/session.service";
import { Injectable } from "@angular/core";

@Injectable()
export class StockAnalyticsFactory extends ModelObjectFactory<StockAnalytics>
{
    constructor( protected session: SessionService )
    {
        super();
    }

    public newModelObject(): StockAnalytics
    {
        var stockAnalytics: StockAnalytics = new StockAnalytics();
        stockAnalytics.id = 0;
        stockAnalytics.customerId = this.session.getLoggedInUserId();
        stockAnalytics.tickerSymbol = '';
        stockAnalytics.companyName = '';
        stockAnalytics.comments = '';
        stockAnalytics.analystStrongBuyCount = 0;
        stockAnalytics.analystBuyCount = 0;
        stockAnalytics.analystHoldCount = 0;
        stockAnalytics.analystUnderPerformCount = 0;
        stockAnalytics.analystSellCount = 0;
        stockAnalytics.analystSentimentDate = null;
        stockAnalytics.avgAnalystPriceTarget = 0;
        stockAnalytics.lowAnalystPriceTarget = 0;
        stockAnalytics.highAnalystPriceTarget = 0;
        stockAnalytics.analystPriceDate = null;
        stockAnalytics.lastPrice = 0;
        stockAnalytics.lastPriceChange = null;
        stockAnalytics.avgUpsidePercent = 0;
        return stockAnalytics;
    }
}
