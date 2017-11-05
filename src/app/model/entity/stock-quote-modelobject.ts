import { ModelObject } from "./modelobject";

/**
 * Created 11/4/2017
 */
export abstract class StockQuoteModelObject<T> extends ModelObject<T>
{
    public stockQuoteState: number;

}
