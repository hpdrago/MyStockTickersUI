import { Injectable } from "@angular/core";
import { Customer } from "../model/entity/customer";
import { SessionService } from "./session.service";
import { CustomerCrudService } from "./crud/customer-crud.service";
import { BaseService } from "./base-service";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

/**
 * This is the general (not CRUD) service class for the customer.
 *
 * Created 12/4/2017
 */
@Injectable()
export class CustomerService extends BaseService
{
    constructor( private session: SessionService,
                 private customerCrudService: CustomerCrudService )
    {
        super();
    }

    public onLogin( customer: Customer )
    {
        this.debug( "onLogin " + JSON.stringify( customer ));
        this.customerCrudService.loadSources();
    }
}
