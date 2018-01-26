import { StockCompany } from "../entity/stock-company";
import { ModelObjectFactory } from "./model-object.factory";
import { Injectable } from "@angular/core";
import { SessionService } from "../../service/session.service";
import { StockQuote } from '../entity/stock-quote';
import { CachedValueState } from '../../common/cached-value-state.enum';

/**
 * This class provides StockCompany factory methods.
 *
 * Created by mike on 12/13/2016.
 */
@Injectable()
export class StockQuoteFactory extends ModelObjectFactory<StockQuote>
{
    constructor( protected session: SessionService )
    {
        super();
    }

    /**
     * Create a new StockCompany instance
     * @returns {StockCompany}
     */
    public newModelObject(): StockQuote
    {
        let stockQuote: StockQuote = new StockQuote();
        stockQuote.tickerSymbol = '';
        stockQuote.companyName = '';
        stockQuote.calculationPrice = '';
        stockQuote.openPrice = 0;
        stockQuote.closePrice = 0;
        stockQuote.highPrice = 0;
        stockQuote.lowPrice = 0;
        stockQuote.latestPrice = 0;
        stockQuote.latestPriceSource = '';
        stockQuote.latestPriceTime ='';
        stockQuote.latestUpdate = 0;
        stockQuote.latestVolume = 0;
        stockQuote.thirtyDayAvgVolume = 0;
        stockQuote.changeAmount = 0;
        stockQuote.delayedPrice = 0;
        stockQuote.delayedPriceTime = 0;
        stockQuote.previousClose = 0;
        stockQuote.changePercent = 0;
        stockQuote.marketCap = 0;
        stockQuote.peRatio = 0;
        stockQuote.week52High = 0;
        stockQuote.week52Low = 0;
        stockQuote.week52Change = 0;
        stockQuote.ytdChangePercent = 0;
        stockQuote.lastQuoteRequestDate = new Date();
        stockQuote.discontinuedInd = false;
        stockQuote.cacheState = CachedValueState.STALE;
        stockQuote.cacheError = '';
        stockQuote.expirationTime = new Date();
        return stockQuote;
    }
}
