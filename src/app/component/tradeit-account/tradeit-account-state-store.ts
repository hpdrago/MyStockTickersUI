/**
 * Created by mike on 2/4/2018
 */
import { CrudStateStore } from '../crud/common/crud-state-store';
import { TradeItAccount } from '../../model/entity/tradeit-account';
import { Injectable } from '@angular/core';
import { TradeItAccountFactory } from '../../model/factory/tradeit-account.factory';

@Injectable()
export class TradeItAccountStateStore extends CrudStateStore<TradeItAccount>
{
    /**
     * Constructor.
     * @param {TradeItAccountFactory} tradeItAccountFactory
     */
    constructor( tradeItAccountFactory: TradeItAccountFactory )
    {
        super( tradeItAccountFactory );
    }
}
