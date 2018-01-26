import { ModelObjectFactory } from "./model-object.factory";
import { Injectable } from "@angular/core";
import { SessionService } from "../../service/session.service";
import { TradeItAccount } from "../entity/tradeit-account";
import { LinkedAccount } from "../entity/linked-account";

/**
 * This class provides LinkedAccount factory methods.
 *
 * Created by mike on 1/19/2018
 */
@Injectable()
export class LinkedAccountFactory extends ModelObjectFactory<LinkedAccount>
{
    constructor( protected session: SessionService )
    {
        super();
    }

    /**
     * Create a new TradeItLinkedAccount instance
     * @returns {TradeItAccount}
     */
    public newModelObject(): LinkedAccount
    {
        let linkedAccount: LinkedAccount = new LinkedAccount();
        linkedAccount.customerId = this.session.getLoggedInUserId();
        return linkedAccount;
    }

}
