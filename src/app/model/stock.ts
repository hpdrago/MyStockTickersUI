/**
 * Created by mike on 9/12/2016.
 */
export class Stock
{
    public tickerSymbol: string;
    public companyName: string;
    public lastPrice: number;
    public exchange: string;
    public createdBy: number;
    public userEntered: boolean;

    constructor( tickerSymbol: string,
                 companyName: string,
                 lastPrice: number,
                 exchange: string,
                 createdBy: number,
                 userEntered: boolean )
    {
        this.tickerSymbol = tickerSymbol;
        this.companyName = companyName;
        this.lastPrice = lastPrice;
        this.exchange = exchange;
        this.createdBy = createdBy;
        this.userEntered = userEntered;
    }

    public getTickerSymbol(): string
    {
        return this.tickerSymbol;
    }

    /**
     * Determines if the stock was entered by a user. Otherwise, it was download from a stock exchange source.
     * @returns false if the stock was entered by a user, otherwise true as it was information
     *          downloaded from a data feed
     */
    public isUserEntered(): boolean
    {
        return this.userEntered;
    }

    /**
     * Create a new copy of the stock
     * @returns {Stock}
     */
    public clone(): Stock
    {
        return new Stock( this.tickerSymbol, this.companyName, this.lastPrice, this.exchange, this.createdBy, this.userEntered );
    }
}
