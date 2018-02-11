/**
 * Created by mike on 2/4/2018
 */
import { CrudController } from '../crud/common/crud-controller';
import { TradeItAccount } from '../../model/entity/tradeit-account';
import { Injectable } from '@angular/core';
import { TradeItAccountStateStore } from './tradeit-account-state-store';
import { TradeItAccountFactory } from '../../model/factory/tradeit-account.factory';
import { TradeItAccountCrudActionHandler } from './tradeit-account-crud-action-handler';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

/**
 * This is the Controller for TradeItAccount entity components.
 */
@Injectable()
export class TradeItAccountController extends CrudController<TradeItAccount>
{
    private accountLinkedSubject: Subject<TradeItAccount> = new Subject<TradeItAccount>();

    /**
     * Constructor.
     * @param {TradeItAccountStateStore} tradeItAccountStateStore
     * @param {TradeItAccountFactory} tradeItAccountFactory
     */
    constructor( tradeItAccountStateStore: TradeItAccountStateStore,
                 tradeItAccountFactory: TradeItAccountFactory,
                 tradeItAccountActionHandler: TradeItAccountCrudActionHandler )
    {
        super( tradeItAccountStateStore,
               tradeItAccountFactory,
               tradeItAccountActionHandler );
    }

    /**
     * Subscribe to be notified when a user's brokerage account (TradeItAccount) is successfully linked.
     * @param {(tradeItAccount: TradeItAccount) => any} fn
     * @return {Subscription}
     */
    public subscribeToAccountLinkedEvent( fn: (tradeItAccount: TradeItAccount) => any ): Subscription
    {
        return this.accountLinkedSubject.subscribe( fn );
    }

    /**
     * Notify all subscribers that an account has been successfully linked.
     * @param {TradeItAccount} tradeItAccount
     */
    public sendAccountLinkedEvent( tradeItAccount: TradeItAccount )
    {
        this.accountLinkedSubject.next( tradeItAccount );
    }
}
