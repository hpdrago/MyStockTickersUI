import { StockQuoteModelObject } from './stock-quote-modelobject';

/**
 * This class contains the information for a single stock position within a LinkedAccount.
 */
export class StockPosition extends StockQuoteModelObject<StockPosition>
{
    public id: number = undefined;
    public customerId: number = undefined;
    public tradeItAccountId: number = undefined;
    public linkedAccountId: number = undefined;
    public tickerSymbol: string = undefined;
    public symbolClass: string = undefined;
    public costBasis: number = undefined;
    public holdingType: string = undefined;
    public quantity: number = undefined;
    public todayGainLossDollar: number = undefined;
    public todayGainLossPercentage: number = undefined;
    public totalGainLossDollar: number = undefined;
    public totalGainLossPercentage: number = undefined;
    public exchange: string = undefined;
    public version: number = undefined;

    public getPrimaryKeyValue(): any
    {
        return this.id;
    }

    public getPrimaryKeyName(): string
    {
        return "id";
    }
}
