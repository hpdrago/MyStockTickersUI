/**
 * Created by mike on 2/4/2018
 */
import { CrudStateStore } from '../crud/common/crud-state-store';
import { Portfolio } from '../../model/entity/portfolio';
import { Injectable } from '@angular/core';

@Injectable()
export class PortfolioStateStore extends CrudStateStore<Portfolio>
{

}
