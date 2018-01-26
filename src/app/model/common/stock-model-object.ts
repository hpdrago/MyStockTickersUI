import { StockPriceQuote } from '../entity/stock-price-quote';
import { StockQuote } from '../entity/stock-quote';
import { StockCompany } from '../entity/stock-company';
import { GainsLosses } from '../entity/gains-losses';
import { StockAnalystConsensus } from '../entity/stock-analyst-consensus';

/**
 * This interface defines the properties for a "stock" model object.  This is a model object that contains a ticker symbol
 * and thus can have access to all of the stock related information.
 */
export interface StockModelObject
{
    tickerSymbol: string;
    stockPriceWhenCreated: number;
    stockPriceQuote: StockPriceQuote;
    stockQuote: StockQuote;
    stockCompany: StockCompany;
    stockGainsLosses: GainsLosses;
    stockAnalystConsensus: StockAnalystConsensus;

    initializeStockModelObjects();
}
