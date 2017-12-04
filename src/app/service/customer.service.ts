import { Injectable } from "@angular/core";
import { Customer } from "../model/entity/customer";
import { SessionService } from "./crud/session.service";
import { CustomerCrudService } from "./crud/customer-crud.service";

@Injectable()
export class CustomerService
{
    constructor( private session: SessionService,
                 private customerCrudService: CustomerCrudService )
    {
    }

    public login( email: string )
    {
        this.customerCrudService.loadSources();
        this.customerCrudService.getCustomerByEmail( email )
                                .subscribe( (customer: Customer ) =>
                                            {
                                                this.session.setCustomer( customer );
                                            });
    }
}
