import { ModelObjectFactory } from "./model-object.factory";
import { Injectable } from "@angular/core";
import { SessionService } from "../../service/crud/session.service";
import { Customer } from "../entity/customer";

/**
 * This class provides Customer factory methods.
 *
 * Created by mike on 12/13/2016.
 */
@Injectable()
export class CustomerFactory extends ModelObjectFactory<Customer>
{
    constructor( protected session: SessionService )
    {
        super();
    }

    /**
     * Create a new Customer instance
     * @returns {Customer}
     */
    public newModelObject(): Customer
    {
        var customer = new Customer();
        return customer;
    }
}
