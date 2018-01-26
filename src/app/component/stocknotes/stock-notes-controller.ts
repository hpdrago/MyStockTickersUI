/**
 * Created by mike on 2/4/2018
 */
import { CrudController } from '../crud/common/crud-controller';
import { StockNotes } from '../../model/entity/stock-notes';
import { Injectable } from '@angular/core';
import { StockNotesStateStore } from './stock-notes-state-store';
import { StockNotesFactory } from '../../model/factory/stock-notes.factory';
import { StockNotesActionHandler } from './stock-notes-action-handler';

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
     * @param {StockNotesActionHandler} stockNotesActionHandler
     */
    constructor( stockNotesStateStore: StockNotesStateStore,
                 stockNotesFactory: StockNotesFactory,
                 stockNotesActionHandler: StockNotesActionHandler )
    {
        super( stockNotesStateStore,
               stockNotesFactory,
               stockNotesActionHandler );
    }
}
