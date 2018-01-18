import { ModelObjectFactory } from "./model-object.factory";
import { Injectable } from "@angular/core";
import { SessionService } from "../../service/session.service";
import { TradeItAccount } from "../entity/tradeit-account";

/**
 * This class provides TradeItLinkedAccount factory methods.
 *
 * Created by mike on 12/4/2017.
 */
@Injectable()
export class TradeItAccountFactory extends ModelObjectFactory<TradeItAccount>
{
    constructor( protected session: SessionService )
    {
        super();
    }

    /**
     * Create a new TradeItLinkedAccount instance
     * @returns {TradeItAccount}
     */
    public newModelObject(): TradeItAccount
    {
        var account = new TradeItAccount();
        account.customerId = this.session.getLoggedInUserId();
        account.brokerage = "";
        account.id = 0;
        account.name = "";
        return account;
    }

}
