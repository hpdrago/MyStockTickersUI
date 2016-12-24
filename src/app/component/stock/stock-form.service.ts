import { CrudFormService } from "../common/crud-form.service";
import { Stock } from "../../model/stock";
import { Injectable, ApplicationRef } from "@angular/core";

/**
 * Created by mike on 12/14/2016.
 */
@Injectable()
export class StockFormService extends CrudFormService<Stock>
{
    constructor()
    {
        super();
    }
}

