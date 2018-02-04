/**
 * Created by mike on 2/4/2018
 */

import { CrudStateStore } from '../crud/common/crud-state-store';
import { StockNotes } from '../../model/entity/stock-notes';
import { Injectable } from '@angular/core';

/**
 * Stock notes state store.
 */
@Injectable()
export class StockNotesStateStore extends CrudStateStore<StockNotes>
{

}
