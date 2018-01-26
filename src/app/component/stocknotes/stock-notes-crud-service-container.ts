import { CrudServiceContainer } from "../crud/common/crud-service-container";
import { Injectable } from "@angular/core";
import { StockNotesCrudService } from "../../service/crud/stock-notes-crud.service";
import { StockNotesCountService } from "../../service/crud/stock-notes-count.service";
import { StockNotes } from "../../model/entity/stock-notes";
import { StockNotesFactory } from "../../model/factory/stock-notes.factory";
import { StockNotesSourceService } from "../../service/crud/stock-notes-source.service";
import { ModelObjectChangeService } from "../../service/crud/model-object-change.service";
import { CrudDialogService } from "../crud/dialog/crud-dialog.service";
import { ToastsManager } from "ng2-toastr";

/**
 * This is the service container for the StockNotes entity.
 */
@Injectable()
export class StockNotesCrudServiceContainer extends CrudServiceContainer<StockNotes>
{
    /**
     * Constructor.
     * @param {StockNotesFactory} _stockNoteFactory
     * @param {StockNotesCrudService} _stockNoteCrudService
     * @param {StockNotesCountService} _stockNoteCountService
     * @param {StockNotesSourceService} _stockNoteSourceService
     */
    constructor( private _stockNoteFactory: StockNotesFactory,
                 private _stockNoteCrudService: StockNotesCrudService,
                 private _stockNoteCountService: StockNotesCountService,
                 private _stockNoteSourceService: StockNotesSourceService )
    {
        super( new ModelObjectChangeService<StockNotes>(), _stockNoteFactory, _stockNoteCrudService )
        this.crudDialogService = new CrudDialogService<StockNotes>( _stockNoteFactory, this.crudFormButtonsService );
        this.crudPanelService = this.crudDialogService;
    }

    get stockNoteFactory(): StockNotesFactory { return this._stockNoteFactory; }

    set stockNoteFactory( value: StockNotesFactory ) { this._stockNoteFactory = value; }

    get stockNoteCrudService(): StockNotesCrudService { return this._stockNoteCrudService; }

    set stockNoteCrudService( value: StockNotesCrudService ) { this._stockNoteCrudService = value; }

    get stockNoteCountService(): StockNotesCountService { return this._stockNoteCountService; }

    set stockNoteCountService( value: StockNotesCountService ) { this._stockNoteCountService = value; }

    get stockNoteSourceService(): StockNotesSourceService { return this._stockNoteSourceService; }

    set stockNoteSourceService( value: StockNotesSourceService ) { this._stockNoteSourceService = value; }

}
