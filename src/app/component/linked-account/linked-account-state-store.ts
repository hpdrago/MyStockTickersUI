/**
 * Created by mike on 2/4/2018
 */
import { CrudStateStore } from '../crud/common/crud-state-store';
import { LinkedAccount } from '../../model/entity/linked-account';
import { Injectable } from '@angular/core';

@Injectable()
export class LinkedAccountStateStore extends CrudStateStore<LinkedAccount>
{

}
