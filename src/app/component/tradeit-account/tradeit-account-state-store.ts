/**
 * Created by mike on 2/4/2018
 */
import { CrudStateStore } from '../crud/common/crud-state-store';
import { TradeItAccount } from '../../model/entity/tradeit-account';
import { Injectable } from '@angular/core';

@Injectable()
export class TradeItAccountStateStore extends CrudStateStore<TradeItAccount>
{
}
