/**
 * Created by mike on 2/4/2018
 */
import { CrudStateStore } from '../crud/common/crud-state-store';
import { LinkedAccount } from '../../model/entity/linked-account';
import { Injectable } from '@angular/core';
import { LinkedAccountFactory } from '../../model/factory/linked-account.factory';

/**
 * The state store for LinkedAccount components.
 */
@Injectable()
export class LinkedAccountStateStore extends CrudStateStore<LinkedAccount>
{
    /**
     * Constructor.
     * @param {LinkedAccountFactory} linkedAccountFactory
     */
    constructor( linkedAccountFactory: LinkedAccountFactory )
    {
        super( linkedAccountFactory );
    }
}
