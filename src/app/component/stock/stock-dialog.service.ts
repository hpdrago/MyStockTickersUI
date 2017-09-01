import { CrudDialogService } from "../crud/dialog/crud-dialog.service";
import { Stock } from "../../model/entity/stock";
import { Injectable } from "@angular/core";
import { StockFactory } from "../../model/factory/stock.factory";
/**
 * Created by mike on 1/2/2017.
 */
@Injectable()
export class StockDialogService extends CrudDialogService<Stock>
{
    constructor( protected stockFactory: StockFactory )
    {
        super( stockFactory );
    }
}

