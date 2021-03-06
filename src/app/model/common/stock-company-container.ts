import { StockCompany } from '../entity/stock-company';

/**
 * This interface defines the methods that model objects must implement to work with the {@code StockCompanyComponent}
 * in order to display the company name.  When loadingData a model object that contains a company name, if StoxTracker doesn't
 * have the company in the database it will be retrieved asynchronously and thus "Loading..." needs to be displayed
 * until the company is loaded.
 */
export interface StockCompanyContainer
{
    tickerSymbol: string;
    stockCompany: StockCompany;
}
