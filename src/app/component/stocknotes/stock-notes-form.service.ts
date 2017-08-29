import { CrudFormService } from "../crud/crud-form.service";
import { StockNotes } from "../../model/class/stock-notes";
import { Injectable } from "@angular/core";
import { StockNotesFactory } from "../../model/factory/stock-notes.factory";

/**
 * Created by mike on 8/15/2017.
 */
@Injectable()
export class StockNotesFormService extends CrudFormService<StockNotes>
{
    constructor( protected stockNoteFactory: StockNotesFactory )
    {
        super( stockNoteFactory );
    }
}
