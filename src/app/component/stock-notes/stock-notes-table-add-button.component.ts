import { CrudTableAddButtonComponent } from '../crud/table/crud-table-add-button.component';
import { StockNotes } from '../../model/entity/stock-notes';
import { Component } from '@angular/core';
import { CrudOperation } from '../crud/common/crud-operation';
import { SessionService } from '../../service/session.service';
import { ToastsManager } from 'ng2-toastr';
import { StockNotesStateStore } from './stock-notes-state-store';
import { StockNotesController } from './stock-notes-controller';
import { StockNotesFactory } from '../../model/factory/stock-notes.factory';
import { StockNotesCrudService } from '../../service/crud/stock-notes-crud.service';

@Component
({
     selector: 'stock-notes-table-add-button',
     templateUrl: '../crud/table/crud-table-button.component.html'
 })
export class StockNotesTableAddButtonComponent extends CrudTableAddButtonComponent<StockNotes>
{
    /**
     * Constructor.
     * @param {SessionService} session
     * @param {StockNotesStateStore} stockNotesStateStore
     * @param {StockNotesController} stockNotesController
     * @param {StockNotesFactory} stockNotesFactory
     * @param {StockNotesCrudService} stockNotesCrudService
     * @param {ToastsManager} toaster
     */
    constructor( protected session: SessionService,
                 protected toaster: ToastsManager,
                 protected stockNotesStateStore: StockNotesStateStore,
                 protected stockNotesController: StockNotesController,
                 protected stockNotesFactory: StockNotesFactory,
                 protected stockNotesCrudService: StockNotesCrudService )
    {
        super( toaster,
               stockNotesStateStore,
               stockNotesController,
               stockNotesFactory,
               stockNotesCrudService );
    }

    protected onButtonClick(): void
    {
        super.onButtonClick();
    }
}
