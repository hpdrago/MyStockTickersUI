/**
 * Created by mike on 2/4/2018
 */
import { CrudStateStore } from '../crud/common/crud-state-store';
import { Injectable } from '@angular/core';
import { StockNotesSource } from '../../model/entity/stock-notes-source';
import { StockNotesSourceFactory } from '../../model/factory/stock-notes-source.factory';

@Injectable()
export class StockNotesSourceStateStore extends CrudStateStore<StockNotesSource>
{
    /**
     * Constructor.
     * @param {StockNotesSourceFactory} stockNotesSourceFactory
     */
    constructor( stockNotesSourceFactory: StockNotesSourceFactory )
    {
        super( stockNotesSourceFactory );
    }
}
