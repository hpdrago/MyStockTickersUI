import { CrudFormService } from "../crud/form/crud-form.service";
import { StockNotes } from "../../model/entity/stock-notes";
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
