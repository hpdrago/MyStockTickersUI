import { CrudFormService } from "../common/crud-form.service";
import { StockNote } from "../../model/class/stock-note";
import { Injectable } from "@angular/core";

/**
 * Created by mike on 8/15/2017.
 */
@Injectable()
export class StockNotesFormService extends CrudFormService<StockNote>
{
}
