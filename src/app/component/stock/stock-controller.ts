/**
 * Created by mike on 2/4/2018
 */
import { CrudController } from '../crud/common/crud-controller';
import { Stock } from '../../model/entity/stock';
import { Injectable } from '@angular/core';

@Injectable()
export class StockController extends CrudController<Stock>
{
}
