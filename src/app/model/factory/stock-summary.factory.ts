
import { ModelObjectFactory } from "./model-object.factory";
import { StockSummary } from "../entity/stock-summary";

export class StockSummaryFactory extends ModelObjectFactory<StockSummary>
{
    public newModelObject(): StockSummary
    {
        var stockSummary: StockSummary = new StockSummary();
        stockSummary.id = 0;
        stockSummary.customerId = 0;
        stockSummary.tickerSymbol = '';
        stockSummary.companyName = '';
        stockSummary.comments = '';
        stockSummary.analystBuyCount = 0;
        stockSummary.analystSellCount = 0;
        stockSummary.analystHoldCount = 0;
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
