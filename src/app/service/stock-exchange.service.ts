import { StockExchanges } from "../model/class/stock-exchanges";

/**
 * Stock Exchange service
 * Created by mike on 10/10/2016.
 */
export class StockExchangeService
{
    public get(): StockExchanges
    {
        return new StockExchanges();
    }
}
