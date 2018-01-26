import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CrudFormButtonsComponent } from "../crud/form/crud-form-buttons.component";
import { TradeItAccountOAuthService } from "../../service/tradeit/tradeit-account-oauth.service";
import { LinkedAccount } from '../../model/entity/linked-account';
import { LinkedAccountCrudService } from '../../service/crud/linked-account-crud.service';
import { LinkedAccountFactory } from '../../model/factory/linked-account.factory';
import { LinkedAccountController } from './linked-account-controller';
import { LinkedAccountStateStore } from './linked-account-state-store';

/**
 * Button panel component for the Account dialog.
 *
 * Created by mike on 8/15/2017.
 */
@Component({
    selector:    'linked-account-form-buttons',
    templateUrl: '../crud/form/crud-form-buttons.component.html',
    styleUrls:  ['../crud/form/crud-form-buttons.component.css'],
    providers:  [TradeItAccountOAuthService]
})
export class LinkedAccountFormButtonsComponent extends CrudFormButtonsComponent<LinkedAccount>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {LinkedAccountStateStore} linkedAccountStateStore
     * @param {LinkedAccountController} linkedAccountController
     * @param {LinkedAccountFactory} linkedAccountFactory
     * @param {LinkedAccountCrudService} linkedAccountCrudService
     * @param {TradeItAccountOAuthService} tradeItAccountOAuthService
     */
    constructor( protected toaster: ToastsManager,
                 private linkedAccountStateStore: LinkedAccountStateStore,
                 private linkedAccountController: LinkedAccountController,
                 private linkedAccountFactory: LinkedAccountFactory,
                 private linkedAccountCrudService: LinkedAccountCrudService,
                 private tradeItAccountOAuthService: TradeItAccountOAuthService )
    {
        super( toaster,
               linkedAccountStateStore,
               linkedAccountController,
               linkedAccountFactory,
               linkedAccountCrudService );
    }

    public getDeleteKeyword(): string
    {
        return "Linked Account";
    }
}
