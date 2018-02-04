/**
 * Created by mike on 2/4/2018
 */
import { CrudStateStore } from '../crud/common/crud-state-store';
import { PortfolioStock } from '../../model/entity/portfolio-stock';
import { Injectable } from '@angular/core';

@Injectable()
export class PortfolioStockStateStore extends CrudStateStore<PortfolioStock>
{
}
