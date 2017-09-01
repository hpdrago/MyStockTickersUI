import { Stock } from "../entity/stock";
import { ModelObjectFactory } from "./model-object.factory";
import { Injectable } from "@angular/core";

/**
 * This class provides Stock factory methods.
 *
 * Created by mike on 12/13/2016.
 */
@Injectable()
export class StockFactory extends ModelObjectFactory<Stock>
{
    /**
     * Create a new Stock instance
     * @returns {Stock}
     */
    public newModelObject(): Stock
    {
        var stock = new Stock( '', '', 0, '', 0, false );
        //console.log( "newStock...: " + JSON.stringify( stock ) + " isUserEntered(): " + stock.isUserEntered() );
        return stock;
    }
}
