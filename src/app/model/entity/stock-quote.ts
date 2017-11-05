/**
 * Created by mike on 11/4/2017
 */
import { StockQuoteState } from "../../component/common/stock-quote-state";

export class StockQuote
{
    public tickerSymbol: string;
    public companyName: string;
    public lastPrice: number;
    public lastPriceDate: Date;
    public stockQuoteState: StockQuoteState;
}
