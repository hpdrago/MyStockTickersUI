import { Stock } from "../entity/stock";
import { ModelObjectFactory } from "./model-object.factory";
import { Injectable } from "@angular/core";
import { SessionService } from "../../service/session.service";
import { StockPriceQuote } from '../entity/stock-price-quote';

/**
 * This class provides Stock factory methods.
 *
 * Created by mike on 12/13/2016.
 */
@Injectable()
export class StockPriceQuoteFactory extends ModelObjectFactory<StockPriceQuote>
{
    constructor( protected session: SessionService )
    {
        super();
    }

    /**
     * Create a new Stock instance
     * @returns {Stock}
     */
    public newModelObject(): StockPriceQuote
    {
        var stock = new StockPriceQuote();
        stock.tickerSymbol = '';
        stock.companyName = '';
        return stock;
    }
}
