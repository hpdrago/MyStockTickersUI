import { StockNotes } from "../../model/entity/stock-notes";
import { Injectable } from "@angular/core";
import { CrudFormButtonsService } from "../crud/form/crud-form-buttons.service";
import { StockNotesFactory } from "../../model/factory/stock-notes.factory";
/**
 * Created by mike on 8/15/2017.
 */
@Injectable()
export class StockNotesFormButtonsService extends CrudFormButtonsService<StockNotes>
{
    constructor( protected stockNotesFactory: StockNotesFactory )
    {
        super( stockNotesFactory );
    }
}
