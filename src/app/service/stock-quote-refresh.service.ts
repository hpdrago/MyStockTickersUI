/**
 * Created by mike on 11/4/2017
 */
import { StockQuoteModelObject } from "../model/entity/stock-quote-modelobject";
import { Observable } from "rxjs/Observable";
import { CrudRestService } from "./crud/crud-rest.serivce";

export class StockQuoteRefreshService<T extends StockQuoteModelObject<T>>
{
    constructor( private crudRestService: CrudRestService<T> )
    {

    }

    public refreshStockQuote<T extends StockQuoteModelObject<T>>( stockQuoteModelObject: T ): Observable<T>
    {

    }
}
