import { Injectable } from "@angular/core";
import { Customer } from "../model/entity/customer";
import { SessionService } from "./session.service";
import { CustomerCrudService } from "./crud/customer-crud.service";
import { BaseService } from "./base-service";
import { ToastsManager } from "ng2-toastr";

/**
 * This is the general (not CRUD) service class for the customer.
 *
 * Created 12/4/2017
 */
@Injectable()
export class CustomerService extends BaseService
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {SessionService} session
     * @param {CustomerCrudService} customerCrudService
     */
    constructor( protected toaster: ToastsManager,
                 private session: SessionService,
                 private customerCrudService: CustomerCrudService )
    {
        super( toaster );
    }

    public onLogin( customer: Customer )
    {
        this.debug( "onLogin " + JSON.stringify( customer ));
        this.customerCrudService.loadSources();
    }
}
