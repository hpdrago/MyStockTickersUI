import { CrudTableButtonsService } from "../crud/table/crud-table-buttons.service";
import { StockNotes } from "../../model/entity/stock-notes";
import { Injectable } from "@angular/core";
import { StockNotesFactory } from "../../model/factory/stock-notes.factory";

/**
 * Created by mike on 8/15/2017.
 */
@Injectable()
export class StockNotesTableButtonsService extends CrudTableButtonsService<StockNotes>
{
    constructor( protected stockNotesFactory: StockNotesFactory )
    {
        super( stockNotesFactory );
    }
}
