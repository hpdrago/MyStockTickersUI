import { CrudTableAddButtonComponent } from '../crud/table/crud-table-add-button.component';
import { Component } from '@angular/core';
import { CrudOperation } from '../crud/common/crud-operation';
import { SessionService } from '../../service/session.service';
import { ToastsManager } from 'ng2-toastr';
import { LinkedAccountStateStore } from './linked-account-state-store';
import { LinkedAccountController } from './linked-account-controller';
import { LinkedAccountCrudService } from '../../service/crud/linked-account-crud.service';
import { LinkedAccountFactory } from '../../model/factory/linked-account.factory';
import { LinkedAccount } from '../../model/entity/linked-account';
import { TradeItAccountController } from '../tradeit-account/tradeit-account-controller';
import { TradeItAccount } from '../../model/entity/tradeit-account';
import { isNullOrUndefined } from 'util';

@Component
({
     selector: 'linked-account-table-add-button',
     templateUrl: '../crud/table/crud-table-button.component.html'
 })
export class LinkedAccountTableAddButtonComponent extends CrudTableAddButtonComponent<LinkedAccount>
{
    private tradeItAccount: TradeItAccount;

    /**
     * Constructor.
     * @param {SessionService} session
     * @param {LinkedAccountStateStore} linkedAccountStateStore
     * @param {LinkedAccountController} linkedAccountController
     * @param {LinkedAccountFactory} linkedAccountFactory
     * @param {LinkedAccountCrudService} linkedAccountCrudService
     * @param {ToastsManager} toaster
     */
    constructor( protected session: SessionService,
                 protected toaster: ToastsManager,
                 protected linkedAccountStateStore: LinkedAccountStateStore,
                 protected linkedAccountController: LinkedAccountController,
                 protected linkedAccountFactory: LinkedAccountFactory,
                 protected linkedAccountCrudService: LinkedAccountCrudService,
                 protected tradeItAccountController: TradeItAccountController )
    {
        super( toaster,
               linkedAccountStateStore,
               linkedAccountController,
               linkedAccountFactory,
               linkedAccountCrudService );
    }

    /**
     * Subscribe to the selection of a trade it account so we can determine if this button should be enabled.
     */
    public ngOnInit()
    {
        super.ngOnInit();
        this.tradeItAccountController
            .subscribeToTableSelectionChangeEvent( tradeItAccount =>
                                                   {
                                                       return this.onTradeItAccountTableSelectionChange( tradeItAccount );
                                                   });
    }

    protected onButtonClick(): void
    {
        if ( isNullOrUndefined( this.tradeItAccount ) || this.tradeItAccount.isTradeItAccount() )
        {
            let modelObject = this.linkedAccountFactory.newModelObject();
            this.crudStateStore.sendCrudOperationChangedEvent( CrudOperation.CREATE );
            this.crudStateStore.sendModelObjectChangedEvent( this, modelObject );
        }
        super.onButtonClick();
    }

    /**
     * This method is called when a trade it account is selected on the table.
     * @param {TradeItAccount} tradeItAccount
     */
    private onTradeItAccountTableSelectionChange( tradeItAccount: TradeItAccount )
    {
        const methodName = 'onTradeItAccountTableSelectionChange';
        this.log( methodName + ' ' + JSON.stringify( tradeItAccount ));
        this.tradeItAccount = tradeItAccount;
        if ( isNullOrUndefined( this.tradeItAccount ) ||
             this.tradeItAccount.isTradeItAccount() )
        {
            this.disabled = true;
        }
    }
}
