/**
 * Created by mike on 2/4/2018
 */
import { CrudStateStore } from '../crud/common/crud-state-store';
import { Customer } from '../../model/entity/customer';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomerStateStore extends CrudStateStore<Customer>
{

}
