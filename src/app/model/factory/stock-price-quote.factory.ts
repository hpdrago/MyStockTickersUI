import { StockCompany } from "../entity/stock-company";
import { ModelObjectFactory } from "./model-object.factory";
import { Injectable } from "@angular/core";
import { SessionService } from "../../service/session.service";
import { StockPriceQuote } from '../entity/stock-price-quote';
import { CachedValueState } from '../../common/cached-value-state.enum';

/**
 * This class provides StockCompany factory methods.
 *
 * Created by mike on 12/13/2016.
 */
@Injectable()
export class StockPriceQuoteFactory extends ModelObjectFactory<StockPriceQuote>
{
    /**
     * Constructor.
     * @param {SessionService} session
     */
    constructor( protected session: SessionService )
    {
        super();
    }

    /**
     * Create a new StockCompany instance
     * @returns {StockCompany}
     */
    public newModelObject(): StockPriceQuote
    {
        var stockPriceQuote = new StockPriceQuote();
        stockPriceQuote.tickerSymbol = '';
        stockPriceQuote.lastPrice = 0;
        stockPriceQuote.cacheState = CachedValueState.STALE;
        stockPriceQuote.cacheError = '';
        stockPriceQuote.expirationTime;
        return stockPriceQuote;
    }
}
