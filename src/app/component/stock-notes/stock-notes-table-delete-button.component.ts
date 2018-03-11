import { CrudTableDeleteButtonComponent } from '../crud/table/crud-table-delete-button.component';
import { StockNotes } from '../../model/entity/stock-notes';
import { Component } from '@angular/core';
import { StockNotesCrudService } from '../../service/crud/stock-notes-crud.service';
import { StockNotesFactory } from '../../model/factory/stock-notes.factory';
import { StockNotesController } from './stock-notes-controller';
import { StockNotesStateStore } from './stock-notes-state-store';
import { SessionService } from '../../service/session.service';
import { ToastsManager } from 'ng2-toastr';

@Component
({
     selector: 'stock-notes-table-delete-button',
     templateUrl: '../crud/table/crud-table-button.component.html'
 })
export class StockNotesTableDeleteButtonComponent extends CrudTableDeleteButtonComponent<StockNotes>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {SessionService} session
     * @param {StockNotesStateStore} stockNotesStateStore
     * @param {StockNotesController} stockNotesController
     * @param {StockNotesFactory} stockNotesFactory
     * @param {StockNotesCrudService} stockNotesCrudService
     */
    constructor( protected toaster: ToastsManager,
                 private session: SessionService,
                 private stockNotesStateStore: StockNotesStateStore,
                 private stockNotesController: StockNotesController,
                 private stockNotesFactory: StockNotesFactory,
                 private stockNotesCrudService: StockNotesCrudService )
    {
        super( toaster,
               stockNotesStateStore,
               stockNotesController,
               stockNotesFactory,
               stockNotesCrudService );
    }
}
