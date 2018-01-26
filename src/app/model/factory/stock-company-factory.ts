import { ModelObjectFactory } from "./model-object.factory";
import { Injectable } from "@angular/core";
import { SessionService } from "../../service/session.service";
import { StockPosition } from '../entity/stock-position';
import { StockCompany } from '../entity/stock-company';
import { CachedValueState } from '../../common/cached-value-state.enum';

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
        let stockCompany = new StockCompany();
        stockCompany.tickerSymbol = '';
        stockCompany.companyName = '';
        stockCompany.lastPrice = 0;
        stockCompany.cacheError = '';
        stockCompany.cacheState = CachedValueState.STALE;
        stockCompany.expirationTime = new Date();
        stockCompany.sector = '';
        stockCompany.industry = '';
        return stockCompany;
    }
}
