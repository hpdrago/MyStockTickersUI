/**
 * Created by mike on 9/12/2016.
 */
export class Stock
{
    public tickerSymbol: string;
    public companyName: string;
    public exchange: string;

    constructor( tickerSymbol: string,
                 companyName: string,
                 exchange: string )
    {
        this.tickerSymbol = tickerSymbol;
        this.companyName = companyName;
        this.exchange = exchange;
    }

    public getTickerSymbol(): string
    {
        return this.tickerSymbol;
    }
}
