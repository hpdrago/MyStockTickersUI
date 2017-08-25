import { CrudTableButtonsService } from "../common/crud-table-buttons.service";
import { StockNote } from "../../model/class/stock-note";
import { Injectable } from "@angular/core";

/**
 * Created by mike on 8/15/2017.
 */
@Injectable()
export class StockNotesTableButtonsService extends CrudTableButtonsService<StockNote>
{
}
