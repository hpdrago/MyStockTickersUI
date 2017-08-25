import { Component } from "@angular/core";
import { CrudPanelComponent } from "../common/crud-panel.component";
import { StockNote } from "../../model/class/stock-note";
import { ToastsManager } from "ng2-toastr";

/**
 * This class displays a form for CRUD operations on a StockNotes.
 *
 * Created by mike on 8/15/2017.
 */
@Component(
{
    selector:    'stock-notes-panel',
    templateUrl: './stock-notes-panel.component.html',
    inputs: ['crudFormService', 'crudPanelButtonsService']
})
export class StockNotesPanelComponent extends CrudPanelComponent<StockNote>
{
    constructor( protected toaster: ToastsManager )
    {
        super( toaster );
    }
}
