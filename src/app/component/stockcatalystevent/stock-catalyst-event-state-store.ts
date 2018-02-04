/**
 * Created by mike on 2/4/2018
 */
import { CrudStateStore } from '../crud/common/crud-state-store';
import { StockCatalystEvent } from '../../model/entity/stock-catalyst-event';
import { Injectable } from '@angular/core';

@Injectable()
export class StockCatalystEventStateStore extends CrudStateStore<StockCatalystEvent>
{
}
