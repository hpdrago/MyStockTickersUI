import { Stock } from "../entity/stock";
import { ModelObjectFactory } from "./model-object.factory";
import { Injectable } from "@angular/core";
import { SessionService } from "../../service/session.service";

/**
 * This class provides Stock factory methods.
 *
 * Created by mike on 12/13/2016.
 */
@Injectable()
export class StockFactory extends ModelObjectFactory<Stock>
{
    constructor( protected session: SessionService )
    {
        super();
    }

    /**
     * Create a new Stock instance
     * @returns {Stock}
     */
    public newModelObject(): Stock
    {
        var stock = new Stock();
        stock.tickerSymbol = '';
        stock.companyName = '';
        stock.createdBy = 0;
        stock.stockExchange = '';
        return stock;
    }
}
