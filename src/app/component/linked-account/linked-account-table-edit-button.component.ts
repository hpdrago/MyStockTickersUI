/**
 * Created by mike on 3/10/2018
 */
import { ChangeDetectorRef, Component } from '@angular/core';
import { SessionService } from '../../service/session.service';
import { ToastsManager } from 'ng2-toastr';
import { CrudTableEditButtonComponent } from '../crud/table/crud-table-edit-button.component';
import { LinkedAccount } from '../../model/entity/linked-account';
import { LinkedAccountStateStore } from './linked-account-state-store';
import { LinkedAccountController } from './linked-account-controller';
import { LinkedAccountFactory } from '../../model/factory/linked-account.factory';
import { LinkedAccountCrudService } from '../../service/crud/linked-account-crud.service';

@Component
({
     selector: 'linked-account-table-edit-button',
     templateUrl: '../crud/table/crud-table-button.component.html'
 })
export class LinkedAccountTableEditButtonComponent extends CrudTableEditButtonComponent<LinkedAccount>
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
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected toaster: ToastsManager,
                 private session: SessionService,
                 private linkedAccountStateStore: LinkedAccountStateStore,
                 private linkedAccountController: LinkedAccountController,
                 private linkedAccountFactory: LinkedAccountFactory,
                 private linkedAccountCrudService: LinkedAccountCrudService )
    {
        super( changeDetector,
               toaster,
               linkedAccountStateStore,
               linkedAccountController,
               linkedAccountFactory,
               linkedAccountCrudService );
    }
}
