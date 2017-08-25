import { StockNote } from "../../model/class/stock-note";
import { Injectable } from "@angular/core";
import { CrudPanelButtonsService } from "../common/crud-panel-buttons.service";
/**
 * Created by mike on 8/15/2017.
 */
@Injectable()
export class StockNotesPanelButtonsService extends CrudPanelButtonsService<StockNote>
{
}
