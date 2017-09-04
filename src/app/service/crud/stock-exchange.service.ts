/**
 * Stock Exchange service
 * Created by mike on 10/10/2016.
 */

import { StockExchanges } from "../../model/entity/stock-exchanges";

export class StockExchangeService
{
    public get(): StockExchanges
    {
        return new StockExchanges();
    }
}
