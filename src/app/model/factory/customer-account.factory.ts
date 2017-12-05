import { ModelObjectFactory } from "./model-object.factory";
import { Injectable } from "@angular/core";
import { SessionService } from "../../service/session.service";
import { CustomerAccount } from "../entity/customer-account";

/**
 * This class provides CustomerAccount factory methods.
 *
 * Created by mike on 12/4/2017.
 */
@Injectable()
export class CustomerAccountFactory extends ModelObjectFactory<CustomerAccount>
{
    constructor( protected session: SessionService )
    {
        super();
    }

    /**
     * Create a new CustomerAccount instance
     * @returns {CustomerAccount}
     */
    public newModelObject(): CustomerAccount
    {
        var account = new CustomerAccount();
        account.customerId = this.session.getLoggedInUserId();
        account.brokerage = "";
        account.id = 0;
        account.loginToken = "";
        account.name = "";
        return account;
    }

}
