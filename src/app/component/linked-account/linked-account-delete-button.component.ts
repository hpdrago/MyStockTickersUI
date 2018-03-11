import { CrudTableDeleteButtonComponent } from '../crud/table/crud-table-delete-button.component';
import { SessionService } from '../../service/session.service';
import { ToastsManager } from 'ng2-toastr';
import { Component } from '@angular/core';
import { LinkedAccount } from '../../model/entity/linked-account';
import { LinkedAccountStateStore } from './linked-account-state-store';
import { LinkedAccountController } from './linked-account-controller';
import { LinkedAccountFactory } from '../../model/factory/linked-account.factory';
import { LinkedAccountCrudService } from '../../service/crud/linked-account-crud.service';

@Component
({
     selector: 'linked-account-table-delete-button',
     templateUrl: '../crud/table/crud-table-button.component.html'
 })
export class LinkedAccountTableDeleteButtonComponent extends CrudTableDeleteButtonComponent<LinkedAccount>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {SessionService} session
     * @param {LinkedAccountStateStore} linkedAccountStateStore
     * @param {LinkedAccountController} linkedAccountController
     * @param {LinkedAccountFactory} linkedAccountFactory
     * @param {LinkedAccountCrudService} linkedAccountCrudService
     */
    constructor( protected toaster: ToastsManager,
                 private session: SessionService,
                 private linkedAccountStateStore: LinkedAccountStateStore,
                 private linkedAccountController: LinkedAccountController,
                 private linkedAccountFactory: LinkedAccountFactory,
                 private linkedAccountCrudService: LinkedAccountCrudService )
    {
        super( toaster,
               linkedAccountStateStore,
               linkedAccountController,
               linkedAccountFactory,
               linkedAccountCrudService );
    }
}
