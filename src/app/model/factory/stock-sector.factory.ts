import { Stock } from "../class/stock";
import { ModelObjectFactory } from "./model-object.factory";
import { Injectable } from "@angular/core";
import { StockSectorList } from "../class/stock-sectors.list";

/**
 * This class provides all StockSector CRUD REST Services
 * Created by mike on 12/13/2016.
 */
@Injectable()
export class StockSectorFactory extends ModelObjectFactory<StockSectorList>
{
    /**
     * Create a new Stock instance
     * @returns {Stock}
     */
    public newModelObject(): StockSectorList
    {
        return new StockSectorList();
    }
}
