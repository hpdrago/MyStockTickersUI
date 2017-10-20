
import { ModelObjectFactory } from "./model-object.factory";
import { StockSummary } from "../entity/stock-summary";
import { SessionService } from "../../service/crud/session.service";
import { Injectable } from "@angular/core";

@Injectable()
export class StockSummaryFactory extends ModelObjectFactory<StockSummary>
{
    constructor( protected session: SessionService )
    {
        super();
    }

    public newModelObject(): StockSummary
    {
        var stockSummary: StockSummary = new StockSummary();
        stockSummary.id = 0;
        stockSummary.customerId = this.session.getLoggedInUserId();
        stockSummary.tickerSymbol = '';
        stockSummary.companyName = '';
        stockSummary.comments = '';
        stockSummary.analystStrongBuyCount = 0;
        stockSummary.analystBuyCount = 0;
        stockSummary.analystHoldCount = 0;
        stockSummary.analystUnderPerformCount = 0;
        stockSummary.analystSellCount = 0;
        stockSummary.nextCatalystDate = null;
        stockSummary.nextCatalystDesc = '';
        stockSummary.avgAnalystPriceTarget = 0;
        stockSummary.lowAnalystPriceTarget = 0;
        stockSummary.highAnalystPriceTarget = 0;
        stockSummary.buySharesBelow = 0;
        stockSummary.lastPrice = 0;
        stockSummary.lastPriceChange = null;
        stockSummary.avgUpsidePercent = 0;
        return stockSummary;
    }
}
