/**
 * Created by mike on 2/4/2018
 */
import { CrudController } from '../crud/common/crud-controller';
import { Injectable } from '@angular/core';
import { StockNotesSourceStateStore } from './stock-notes-source-state-store';
import { StockNotesSourceCrudActionHandler } from './stock-notes-source-crud-action-handler';
import { StockNotesSource } from '../../model/entity/stock-notes-source';
import { StockNotesSourceFactory } from '../../model/factory/stock-notes-source.factory';

/**
 * This is the Controller for StockNotesSource entity components.
 */
@Injectable()
export class StockNotesSourceController extends CrudController<StockNotesSource>
{
    /**
     * Constructor
     * @param {StockNotesSourceStateStore} stockNotesSourceStateStore
     * @param {} stockNotesSourceFactory
     * @param {StockNotesSourceCrudActionHandler} stockNotesSourceActionHandler
     */
    constructor( stockNotesSourceStateStore: StockNotesSourceStateStore,
                 stockNotesSourceFactory: StockNotesSourceFactory,
                 stockNotesSourceActionHandler: StockNotesSourceCrudActionHandler )
    {
        super( stockNotesSourceStateStore,
               stockNotesSourceFactory,
               stockNotesSourceActionHandler );
    }
}
