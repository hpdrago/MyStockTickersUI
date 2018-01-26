import { CrudDialogComponent } from "../crud/dialog/crud-dialog.component";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { LinkedAccountFactory } from '../../model/factory/linked-account.factory';
import { LinkedAccountController } from './linked-account-controller';
import { LinkedAccountStateStore } from './linked-account-state-store';
import { LinkedAccountCrudService } from '../../service/crud/linked-account-crud.service';
import { LinkedAccount } from '../../model/entity/linked-account';

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector: 'linked-account-dialog',
    templateUrl: './linked-account-dialog.component.html'
})
export class LinkedAccountDialogComponent extends CrudDialogComponent<LinkedAccount>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {LinkedAccountStateStore} linkedAccountStateStore
     * @param {LinkedAccountController} linkedAccountController
     * @param {LinkedAccountFactory} linkedAccountFactory
     * @param {LinkedAccountCrudService} linkedAccountCrudService
     */
    constructor( protected toaster: ToastsManager,
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
