
import { ModelObjectFactory } from "./model-object.factory";
import { SessionService } from "../../service/crud/session.service";
import { Injectable } from "@angular/core";
import { StockToBuy } from "../entity/stock-to-buy";

@Injectable()
export class StockToBuyFactory extends ModelObjectFactory<StockToBuy>
{
    constructor( protected session: SessionService )
    {
        super();
    }

    public newModelObject(): StockToBuy
    {
        var stockToBuy: StockToBuy = new StockToBuy();
        stockToBuy.id = 0;
        stockToBuy.customerId = this.session.getLoggedInUserId();
        stockToBuy.tickerSymbol = '';
        stockToBuy.companyName = '';
        stockToBuy.comments = '';
        stockToBuy.buySharesUpToPrice = 0;
        stockToBuy.lastPrice = 0;
        stockToBuy.lastPriceChange = null;
        return stockToBuy;
    }
}
