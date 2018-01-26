/**
 * Interface for model objects that contain a ticker symbol.
 */
export interface TickerSymbolContainer
{
    setTickerSymbol( tickerSymbol: string );
    getTickerSymbol(): string;
}
