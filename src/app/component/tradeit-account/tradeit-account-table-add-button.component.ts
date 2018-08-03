import { CrudTableAddButtonComponent } from '../crud/table/crud-table-add-button.component';
import { TradeItAccount } from '../../model/entity/tradeit-account';
import { ChangeDetectorRef, Component } from '@angular/core';
import { SessionService } from '../../service/session.service';
import { ToastsManager } from 'ng2-toastr';
import { TradeItAccountStateStore } from './tradeit-account-state-store';
import { TradeItAccountController } from './tradeit-account-controller';
import { TradeItAccountFactory } from '../../model/factory/tradeit-account.factory';
import { TradeItAccountCrudService } from '../../service/crud/tradeit-account-crud.service';

@Component
({
     selector: 'tradeit-account-table-add-button',
     templateUrl: '../crud/table/crud-table-button.component.html'
 })
export class TradeItAccountTableAddButtonComponent extends CrudTableAddButtonComponent<TradeItAccount>
{
    /**
     * Constructor.
     * @param {SessionService} session
     * @param {TradeItAccountStateStore} tradeItAccountStateStore
     * @param {TradeItAccountController} tradeItAccountController
     * @param {TradeItAccountFactory} tradeItAccountFactory
     * @param {TradeItAccountCrudService} tradeItAccountCrudService
     * @param {ToastsManager} toaster
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected session: SessionService,
                 protected toaster: ToastsManager,
                 protected tradeItAccountStateStore: TradeItAccountStateStore,
                 protected tradeItAccountController: TradeItAccountController,
                 protected tradeItAccountFactory: TradeItAccountFactory,
                 protected tradeItAccountCrudService: TradeItAccountCrudService )
    {
        super( changeDetector,
               toaster,
               tradeItAccountStateStore,
               tradeItAccountController,
               tradeItAccountFactory,
               tradeItAccountCrudService );
    }
}
