import { TradeItAPIResult } from "./tradeit-api-result";
import { TradeItAccount } from "../types/tradeit-account";

/**
 * This class contains the information returned from REST call to authenticate a user's account.
 */
export class TradeItAuthenticateResult extends TradeItAPIResult
{
    /*
     * status == SUCCESS
     */
    public tradeItAccounts: TradeItAccount[];

    /*
     * status = INFORMATION_NEEDED
     */
    public informationType: string;
    public securityQuestion: string;
    public securityOptions: string[];
    public uuid: string;

    public isInformationNeeded(): boolean
    {
        return this.status == "INFORMATION_NEEDED";
    }
}
