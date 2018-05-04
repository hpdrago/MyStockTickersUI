/**
 * This interface defines the required methods that a class must contain to work with the StockUrlMap
 */
export interface StockNotesContainer
{
    getNotes(): string;
    getTickerSymbol(): string;
}
