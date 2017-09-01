import { CrudDialogService } from "../crud/dialog/crud-dialog.service";
import { StockNotes } from "../../model/entity/stock-notes";
import { Injectable } from "@angular/core";
import { StockNotesFactory } from "../../model/factory/stock-notes.factory";

/**
 * This class inherits from the {@code CrudDialogService} class to implement a specific service
 * for {@code StockNotes}.
 *
 * Created by mike on 8/15/2017.
 */
@Injectable()
export class StockNotesDialogService extends CrudDialogService<StockNotes>
{
    constructor( protected stockNotesFactory: StockNotesFactory )
    {
        super( stockNotesFactory );
    }
}
