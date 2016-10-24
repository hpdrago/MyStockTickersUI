/**
 * Created by mike on 9/12/2016.
 */
export class Stock
{
    public tickerSymbol: string;
    public companyName: string;
    public exchange: string;
    public createdBy: number;
    public userEntered: boolean;

    constructor( tickerSymbol: string,
                 companyName: string,
                 exchange: string,
                 createdBy: number,
                 userEntered: boolean )
    {
        this.tickerSymbol = tickerSymbol;
        this.companyName = companyName;
        this.exchange = exchange;
        this.createdBy = createdBy;
        this.userEntered = userEntered;
    }

    public getTickerSymbol(): string
    {
        return this.tickerSymbol;
    }

    /**
     * Determines if the stock was entered by a user. Otherwise, itwas download from a stock exchange source.
     * @returns false if the stock was entered by a user, otherwise true as it was information
     *          downloaded from a data feed
     */
    public isUserEntered(): boolean
    {
        return this.userEntered;
    }
}
