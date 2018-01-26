import { SessionService } from "../../service/session.service";
import { Injectable } from "@angular/core";
import { StockToBuy } from "../entity/stock-to-buy";
import { StockPriceQuoteFactory } from './stock-price-quote.factory';
import { StockQuoteFactory } from './stock-quote.factory';
import { StockModelObjectFactory } from './stock-model-object.factory';

@Injectable()
export class StockToBuyFactory extends StockModelObjectFactory<StockToBuy>
{
    /**
     * Constructor.
     * @param {SessionService} session
     * @param {StockQuoteFactory} stockQuoteFactory
     * @param {StockPriceQuoteFactory} stockPriceQuoteFactory
     */
    constructor( protected session: SessionService,
                 protected stockQuoteFactory: StockQuoteFactory,
                 protected stockPriceQuoteFactory: StockPriceQuoteFactory )
    {
        super( session, stockQuoteFactory, stockPriceQuoteFactory );
    }

    public newModelObject(): StockToBuy
    {
        var stockToBuy: StockToBuy = new StockToBuy();
        stockToBuy.id = '';
        stockToBuy.customerId = this.session.getLoggedInUserId();
        stockToBuy.tickerSymbol = '';
        stockToBuy.comments = '';
        stockToBuy.buySharesUpToPrice = 0;
        stockToBuy.setStockPriceQuote( this.stockPriceQuoteFactory.newModelObject() );
        stockToBuy.setStockQuote( this.stockQuoteFactory.newModelObject() );
        return stockToBuy;
    }
}
