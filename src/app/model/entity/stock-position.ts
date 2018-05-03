import { StockPriceQuoteModelObject } from './stock-price-quote-model-object';

/**
 * This class contains the information for a single stock position within a LinkedAccount.
 */
export class StockPosition extends StockPriceQuoteModelObject<StockPosition>
{
    public id: string;
    public customerId: string;
    public tradeItAccountId: string;
    public linkedAccountId: string;
    public tickerSymbol: string;
    public symbolClass: string;
    public costBasis: number;
    public holdingType: string;
    public quantity: number;
    public todayGainLossAbsolute: number;
    public todayGainLossPercentage: number;
    public totalGainLossAbsolute: number;
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

    /**
     * The market value is shares(quantity) * current price
     * @return {number}
     */
    public marketValue(): number
    {
        return this.quantity * this.lastPrice;
    }
}
