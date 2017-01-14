import { CrudDialogService } from "../common/crud-dialog.service";
import { Stock } from "../../model/stock";
import { Injectable } from "@angular/core";
/**
 * Created by mike on 1/2/2017.
 */
@Injectable()
export class StockDialogService extends CrudDialogService<Stock>
{
}

