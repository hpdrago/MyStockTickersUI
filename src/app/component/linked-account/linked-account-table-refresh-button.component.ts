/**
 * Created by mike on 3/10/2018
 */
import { LinkedAccount } from '../../model/entity/linked-account';
import { ChangeDetectorRef, Component } from '@angular/core';
import { LinkedAccountCrudService } from '../../service/crud/linked-account-crud.service';
import { LinkedAccountFactory } from '../../model/factory/linked-account.factory';
import { LinkedAccountController } from './linked-account-controller';
import { LinkedAccountStateStore } from './linked-account-state-store';
import { SessionService } from '../../service/session.service';
import { ToastsManager } from 'ng2-toastr';
import { CrudTableRefreshButtonComponent } from '../crud/table/crud-table-refresh-button.component';

@Component
({
     selector: 'linked-account-table-refresh-button',
     templateUrl: '../crud/table/crud-table-button.component.html'
 })
export class LinkedAccountTableRefreshButtonComponent extends CrudTableRefreshButtonComponent<LinkedAccount>
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
