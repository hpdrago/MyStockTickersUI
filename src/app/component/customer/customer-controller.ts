/**
 * Created by mike on 2/4/2018
 */
import { CrudController } from '../crud/common/crud-controller';
import { Customer } from '../../model/entity/customer';
import { Injectable } from '@angular/core';
import { CustomerStateStore } from './customer-state-store';
import { CustomerFactory } from '../../model/factory/customer.factory';
import { CustomerCrudActionHandler } from './customer-crud-action-handler';

/**
 * This is the CRUD controller for Customer entity components.
 */
@Injectable()
export class CustomerController extends CrudController<Customer>
{
    /**
     * Constructor.
     * @param {CustomerStateStore} customerStateStore
     * @param {CustomerFactory} customerFactory
     * @param {CustomerCrudActionHandler} customerCrudActionHandler
     */
    constructor( private customerStateStore: CustomerStateStore,
                 private customerFactory: CustomerFactory,
                 private customerCrudActionHandler: CustomerCrudActionHandler )
    {
        super( customerStateStore, customerFactory, customerCrudActionHandler  );
    }
}
