import { ModelObject } from "../entity/modelobject";

/**
 * This is the base class for all ModelObjects that contains a ticker symbol and company name
 */
export abstract class StockModelObject<T extends ModelObject<T>> extends ModelObject<T>
{
    public tickerSymbol: string;
    public companyName: string;

    /**
     * Get the ticker symbol
     * @returns {string}
     */
    public getTickerSymbol(): string
    {
        return this.tickerSymbol;
    }

}
