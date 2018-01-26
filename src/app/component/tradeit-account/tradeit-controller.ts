/**
 * Created by mike on 2/4/2018
 */
import { CrudController } from '../crud/common/crud-controller';
import { TradeItAccount } from '../../model/entity/tradeit-account';
import { Injectable } from '@angular/core';
import { TradeItAccountStateStore } from './tradeit-account-state-store';
import { TradeItAccountFactory } from '../../model/factory/tradeit-account.factory';

/**
 * This is the Controller for TradeItAccount entity components.
 */
@Injectable()
export class TradeItAccountController extends CrudController<TradeItAccount>
{
    /**
     * Constructor.
     * @param {TradeItAccountStateStore} tradeItAccountStateStore
     * @param {TradeItAccountFactory} tradeItAccountFactory
     */
    constructor( tradeItAccountStateStore: TradeItAccountStateStore,
                 tradeItAccountFactory: TradeItAccountFactory )
    {
        super( tradeItAccountStateStore, tradeItAccountFactory );
    }
}
