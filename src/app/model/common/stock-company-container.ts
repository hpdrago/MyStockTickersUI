import { CachedValueState } from '../../common/cached-value-state.enum';

/**
 * This interface defines the methods that model objects must implement to work with the {@code StockCompanyNameComponent}
 * in order to display the company name.  When loading a model object that contains a company name, if StoxTracker doesn't
 * have the company in the database it will be retrieved asynchronously and thus "Loading..." needs to be displayed
 * until the company is loaded.
 */
export interface StockCompanyContainer
{
    getTickerSymbol(): string;
    getStockCompanyCacheState(): CachedValueState;
    setStockCompanyCacheState( stockCompanyCacheState: CachedValueState );
    getCompanyName(): string;
    setCompanyName( companyName: string );
    getStockCompanyCacheError();
}
