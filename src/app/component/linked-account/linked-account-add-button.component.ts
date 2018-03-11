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

@Component
({
     selector: 'linked-account-table-add-button',
     templateUrl: '../crud/table/crud-table-button.component.html'
 })
export class LinkedAccountTableAddButtonComponent extends CrudTableAddButtonComponent<LinkedAccount>
{
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
                 protected linkedAccountCrudService: LinkedAccountCrudService )
    {
        super( toaster,
               linkedAccountStateStore,
               linkedAccountController,
               linkedAccountFactory,
               linkedAccountCrudService );
    }

    protected onButtonClick(): void
    {
        let modelObject = this.linkedAccountFactory.newModelObject();
        this.crudStateStore.sendCrudOperationChangedEvent( CrudOperation.CREATE );
        this.crudStateStore.sendModelObjectChangedEvent( this, modelObject );
        super.onButtonClick();
    }
}
