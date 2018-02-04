/**
 * Created by mike on 2/4/2018
 */
import { CrudStateStore } from '../crud/common/crud-state-store';
import { Stock } from '../../model/entity/stock';
import { Injectable } from '@angular/core';

@Injectable()
export class StockStateStore extends CrudStateStore<Stock>
{

}
