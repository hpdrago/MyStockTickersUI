/**
 * Created by mike on 2/4/2018
 */
import { CrudController } from '../crud/common/crud-controller';
import { StockToBuy } from '../../model/entity/stock-to-buy';
import { Injectable } from '@angular/core';

/**
 * Crud controller for Stock To Buy entities.
 */
@Injectable()
export class StockToBuyController extends CrudController<StockToBuy>
{
}
