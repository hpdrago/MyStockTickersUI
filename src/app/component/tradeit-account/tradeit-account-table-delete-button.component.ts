import { CrudTableDeleteButtonComponent } from '../crud/table/crud-table-delete-button.component';
import { TradeItAccount } from '../../model/entity/tradeit-account';
import { Component } from '@angular/core';
import { TradeItAccountCrudService } from '../../service/crud/tradeit-account-crud.service';
import { TradeItAccountFactory } from '../../model/factory/tradeit-account.factory';
import { SessionService } from '../../service/session.service';
import { ToastsManager } from 'ng2-toastr';
import { TradeItAccountStateStore } from '../tradeit-account/tradeit-account-state-store';
import { TradeItAccountController } from '../tradeit-account/tradeit-account-controller';

@Component
({
     selector: 'tradeit-account-table-delete-button',
     templateUrl: '../crud/table/crud-table-button.component.html'
 })
export class TradeItAccountTableDeleteButtonComponent extends CrudTableDeleteButtonComponent<TradeItAccount>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {SessionService} session
     * @param {TradeItAccountStateStore} tradeItAccountStateStore
     * @param {TradeItAccountController} tradeItAccountController
     * @param {TradeItAccountFactory} tradeItAccountFactory
     * @param {TradeItAccountCrudService} tradeItAccountCrudService
     */
    constructor( protected toaster: ToastsManager,
                 private session: SessionService,
                 private tradeItAccountStateStore: TradeItAccountStateStore,
                 private tradeItAccountController: TradeItAccountController,
                 private tradeItAccountFactory: TradeItAccountFactory,
                 private tradeItAccountCrudService: TradeItAccountCrudService )
    {
        super( toaster,
               tradeItAccountStateStore,
               tradeItAccountController,
               tradeItAccountFactory,
               tradeItAccountCrudService );
    }
}
