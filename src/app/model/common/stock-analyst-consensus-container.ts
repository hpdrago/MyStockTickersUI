/**
 * This interface defines the methods that model objects must implement to work with the {@code StockAnalystConsensusComponent}
 * in order to display the company name.  When loading a model object that contains a company name, if StoxTracker doesn't
 * have the company in the database it will be retrieved asynchronously and thus "Loading..." needs to be displayed
 * until the company is loaded.
 */
import { StockAnalystConsensus } from '../entity/stock-analyst-consensus';

export interface StockAnalystConsensusContainer
{
    tickerSymbol: string;
    stockAnalystConsensus: StockAnalystConsensus;
}
