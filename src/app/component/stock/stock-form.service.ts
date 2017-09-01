import { CrudFormService } from "../crud/form/crud-form.service";
import { Stock } from "../../model/entity/stock";
import { Injectable, ApplicationRef } from "@angular/core";
import { StockFactory } from "../../model/factory/stock.factory";

/**
 * Created by mike on 12/14/2016.
 */
@Injectable()
export class StockFormService extends CrudFormService<Stock>
{
    constructor( protected stockFactory: StockFactory )
    {
        super( stockFactory );
    }
}
