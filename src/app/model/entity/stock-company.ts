import { ModelObject } from "../common/model-object";
import { CachedValueState } from '../../common/cached-value-state.enum';

/**
 * This class defines the fields and methods for a single StockCompany
 * Created by mike on 9/12/2016.
 */
export class StockCompany extends ModelObject<StockCompany>
{
    public tickerSymbol: string;
    public companyName: string;
    public lastPrice: number;
    public cacheError: string;
    public cacheState: CachedValueState;

    public getPrimaryKeyValue(): any
    {
        return this.tickerSymbol;
    }

    public getPrimaryKeyName(): string
    {
        return "tickerSymbol";
    }
}
