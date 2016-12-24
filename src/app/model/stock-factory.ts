import { Stock } from "./stock";
import { ModelObjectFactory } from "./model-object-factory";
import { Injectable } from "@angular/core";
/**
 * Created by mike on 12/13/2016.
 */
@Injectable()
export class StockFactory implements ModelObjectFactory<Stock>
{
    /**
     * Create a new Stock instance from non-stock class that has the same properties
     * @param stock
     * @returns {Stock}
     */
    public newModelObjectFromEvent( stock ): Stock
    {
        return new Stock( stock.tickerSymbol,
            stock.companyName,
            stock.lastPrice,
            stock.exchange,
            stock.createdBy,
            stock.userEntered );
    }

    /**
     * Create a new Stock instance
     * @returns {Stock}
     */
    public newModelObject(): Stock
    {
        return new Stock( '', '', 0, '', 0, false );
    }

}
