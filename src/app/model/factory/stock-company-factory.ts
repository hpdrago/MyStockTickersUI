import { ModelObjectFactory } from "./model-object.factory";
import { Injectable } from "@angular/core";
import { SessionService } from "../../service/session.service";
import { StockPosition } from '../entity/stock-position';
import { StockCompany } from '../entity/stock-company';

/**
 * This class provides StockPosition factory methods.
 *
 * Created by mike on 12/4/2017.
 */
@Injectable()
export class StockCompanyFactory extends ModelObjectFactory<StockCompany>
{
    constructor( protected session: SessionService )
    {
        super();
    }

    /**
     * Create a new StockPosition instance
     * @returns {StockPosition}
     */
    public newModelObject(): StockCompany
    {
        var stockCompany = new StockCompany();
        return stockCompany;
    }
}
