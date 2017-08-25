import { CrudDialogService } from "../common/crud-dialog.service";
import { StockNote } from "../../model/class/stock-note";
import { Injectable } from "@angular/core";

/**
 * This class inherits from the {@code CrudDialogService} class to implement a specific service
 * for {@code StockNote}.
 *
 * Created by mike on 8/15/2017.
 */
@Injectable()
export class StockNotesDialogService extends CrudDialogService<StockNote>
{
}
