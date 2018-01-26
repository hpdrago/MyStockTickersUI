import { StockQuoteModelObject } from './stock-quote-modelobject';

/**
 * This class contains the information for a single stock position within a LinkedAccount.
 */
export class StockPosition extends StockQuoteModelObject<StockPosition>
{
    public id: number;
    public customerId: number;
    public tradeItAccountId: number;
    public linkedAccountId: number;
    public tickerSymbol: string;
    public symbolClass: string;
    public costBasis: number;
    public holdingType: string;
    public quantity: number;
    public todayGainLossDollar: number;
    public todayGainLossPercentage: number;
    public totalGainLossDollar: number;
    public totalGainLossPercentage: number;
    public exchange: string;
    public openPrice: number;
    public closePrice: number;
    public version: number;

    public getPrimaryKeyValue(): any
    {
        return this.id;
    }

    public getPrimaryKeyName(): string
    {
        return "id";
    }
}
