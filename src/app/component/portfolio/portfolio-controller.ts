/**
 * Created by mike on 2/4/2018
 */
import { CrudController } from '../crud/common/crud-controller';
import { Portfolio } from '../../model/entity/portfolio';
import { Injectable } from '@angular/core';

@Injectable()
export class PortfolioController extends CrudController<Portfolio>
{
}
