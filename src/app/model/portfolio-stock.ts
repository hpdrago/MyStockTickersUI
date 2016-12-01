/**
 * This class defines the information about a single stock that the customer is tracking in
 * one or more portfolios
 *
 * Created by mike on 11/1/2016.
 */
export class PortfolioStock
{
    public tickerSymbol: string;
    public companyName: string;
    public numberOfShares: number;
    public costBasis: number;
    public lastPrice: number;
    public sector: string;
    public subSector: string;
    public realizedGain: number;
    public realizedLoss: number;
    public stopLossPrice: number;
    public stopLossShares: number;
    public profitTakingPrice: number;
    public profitTakingShares: number;
}
