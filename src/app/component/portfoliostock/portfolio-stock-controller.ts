/**
 * Created by mike on 2/4/2018
 */
import { CrudController } from '../crud/common/crud-controller';
import { PortfolioStock } from '../../model/entity/portfolio-stock';
import { Injectable } from '@angular/core';

@Injectable()
export class PortfolioStockController extends CrudController<PortfolioStock>
{
}
