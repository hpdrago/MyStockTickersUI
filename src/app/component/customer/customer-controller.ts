/**
 * Created by mike on 2/4/2018
 */
import { CrudController } from '../crud/common/crud-controller';
import { Customer } from '../../model/entity/customer';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomerController extends CrudController<Customer>
{

}
