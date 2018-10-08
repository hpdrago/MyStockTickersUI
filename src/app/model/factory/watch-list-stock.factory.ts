import { ModelObjectFactory } from "./model-object.factory";
import { Injectable } from "@angular/core";
import { WatchListStock } from '../entity/watch-list-stock';

/**
 * This class provides watch list stock factory methods.
 *
 * Created by mike on 09/23/2018.
 */
@Injectable()
export class WatchListStockFactory extends ModelObjectFactory<WatchListStock>
{
    public newModelObject(): WatchListStock
    {
        let watchListStock = new WatchListStock();
        return watchListStock;
    }
}
