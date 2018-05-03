import { ModelObject } from "./modelobject";

/**
 * This class defines the information about a single stock that the customer is tracking in
 * one or more portfolios
 *
 * Created by mike on 11/1/2016.
 */
export class PortfolioStock extends ModelObject<PortfolioStock>
{
    public id: string;
    public portfolioId: string;
    public customerId: string;
    public tickerSymbol: string;
    public companyName: string;
    public numberOfShares: number;
    public averageUnitCost: number;
    public lastPrice: number;
    public sector: string;
    public subSector: string;
    public realizedGains: number;
    public realizedLosses: number;
    public stopLossPrice: number;
    public stopLossShares: number;
    public profitTakingPrice: number;
    public profitTakingShares: number;

    public isEqualPrimaryKey( modelObject: PortfolioStock )
    {
        var isEqual = false;
        if ( modelObject )
        {
            isEqual = this.tickerSymbol === modelObject.tickerSymbol &&
                      this.portfolioId === modelObject.portfolioId;
        }
        return isEqual;
    }

    public getPrimaryKeyValue(): any
    {
        return this.id;
    }

    public getPrimaryKeyName(): string
    {
        return "id";
    }
}
