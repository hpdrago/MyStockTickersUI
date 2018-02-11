/**
 * Created by mike on 2/4/2018
 */
import { CrudController } from '../crud/common/crud-controller';
import { LinkedAccount } from '../../model/entity/linked-account';
import { Injectable } from '@angular/core';
import { LinkedAccountStateStore } from './linked-account-state-store';
import { LinkedAccountFactory } from '../../model/factory/linked-account.factory';
import { LinkedAccountCrudActionHandler } from './linked-account-crud-action-handler';

/**
 * This is the CRUD controller for the LinkedAccount entity components.
 */
@Injectable()
export class LinkedAccountController extends CrudController<LinkedAccount>
{
    /**
     * Constructor.
     * @param {LinkedAccountStateStore} linkedAccountStateStore
     * @param {LinkedAccountFactory} linkedAccountFactory
     * @param {LinkedAccountCrudActionHandler} linkedAccountActionHandler
     */
    constructor( linkedAccountStateStore: LinkedAccountStateStore,
                 linkedAccountFactory: LinkedAccountFactory,
                 linkedAccountActionHandler: LinkedAccountCrudActionHandler )
    {
        super( linkedAccountStateStore,
               linkedAccountFactory,
               linkedAccountActionHandler );
    }
}
