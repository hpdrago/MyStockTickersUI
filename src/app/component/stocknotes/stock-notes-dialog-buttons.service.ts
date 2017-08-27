import { StockNote } from "../../model/class/stock-note";
import { Injectable } from "@angular/core";
import { CrudFormButtonsService } from "../common/crud-form-buttons.service";
/**
 * Created by mike on 8/15/2017.
 */
@Injectable()
export class StockNotesDialogButtonsService extends CrudFormButtonsService<StockNote>
{
}
