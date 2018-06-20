/**
 * Created by mike on 2/4/2018
 */
import { CrudController } from '../crud/common/crud-controller';
import { StockNotes } from '../../model/entity/stock-notes';
import { Injectable } from '@angular/core';
import { StockNotesStateStore } from './stock-notes-state-store';
import { StockNotesFactory } from '../../model/factory/stock-notes.factory';
import { StockNotesCrudActionHandler } from './stock-notes-crud-action-handler';
import { CrudOperation } from '../crud/common/crud-operation';
import { StockNotesActionTaken } from '../../common/stock-notes-action-taken.enum';

/**
 * This is the Controller for StockNotes entity components.
 */
@Injectable()
export class StockNotesController extends CrudController<StockNotes>
{
    /**
     * Constructor.
     * @param {StockNotesStateStore} stockNotesStateStore
     * @param {StockNotesFactory} stockNotesFactory
     * @param {StockNotesCrudActionHandler} stockNotesCrudActionHandler
     */
    constructor( stockNotesStateStore: StockNotesStateStore,
                 stockNotesFactory: StockNotesFactory,
                 stockNotesCrudActionHandler: StockNotesCrudActionHandler )
    {
        super( stockNotesStateStore,
               stockNotesFactory,
               stockNotesCrudActionHandler );
    }

    /**
     * This method is called
     * @param {StockNotes} modelObject
     * @param {CrudOperation} crudOperation
     */
    protected setDefaultValues( stockNotes: StockNotes )
    {
        stockNotes.notesRating = 3;
        stockNotes.bullOrBear = 1;
        stockNotes.actionTaken = StockNotesActionTaken.NONE;
        stockNotes.notesDate = new Date( Date.now() )
    }
}
