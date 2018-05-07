/**
 * Created by mike on 5/6/2018
 */

/**
 * This interface is used with the StockAutoCompleteComponent and StockCrudFormComponent.
 * It contains the fields to be set when the user types in a ticker symbol and selects a stock.
 * The methods in this interface will be called to set the stock quote properties.
 */
export interface StockPriceQuoteContainer
{
    setLastPrice( lastPrice: number );
    setCompanyName( companyName: string );
    setTickerSymbol( tickerSymbol: string );
}