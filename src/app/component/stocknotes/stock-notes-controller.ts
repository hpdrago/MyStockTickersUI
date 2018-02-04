/**
 * Created by mike on 2/4/2018
 */
import { CrudController } from '../crud/common/crud-controller';
import { StockNotes } from '../../model/entity/stock-notes';
import { Injectable } from '@angular/core';

@Injectable()
export class StockNotesController extends CrudController<StockNotes>
{
}
