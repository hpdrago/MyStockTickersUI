/**
 * Created by mike on 2/4/2018
 */
import { CrudController } from '../crud/common/crud-controller';
import { TradeItAccount } from '../../model/entity/tradeit-account';
import { Injectable } from '@angular/core';

@Injectable()
export class TradeItAccountController extends CrudController<TradeItAccount>
{
}
