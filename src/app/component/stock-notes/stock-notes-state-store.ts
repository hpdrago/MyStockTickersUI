/**
 * Created by mike on 2/4/2018
 */

import { CrudStateStore } from '../crud/common/crud-state-store';
import { StockNotes } from '../../model/entity/stock-notes';
import { Injectable } from '@angular/core';
import { StockNotesFactory } from '../../model/factory/stock-notes.factory';

/**
 * State store for Stock Notes components.
 */
@Injectable()
export class StockNotesStateStore extends CrudStateStore<StockNotes>
{
    /**
     * Constructor.
     * @param {StockNotesFactory} stockNotesFactory
     */
    constructor( stockNotesFactory: StockNotesFactory )
    {
        super( stockNotesFactory );
    }
}
