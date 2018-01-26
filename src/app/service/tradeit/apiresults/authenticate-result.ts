import { TradeItAPIResult } from "./tradeit-api-result";
import { JsonObject, JsonProperty } from "json2typescript";
import { LinkedAccount } from "../../../model/entity/linked-account";

/**
 * This class contains the information returned from REST call to authenticate a user's account.
 */
@JsonObject
export class TradeItAuthenticateResult extends TradeItAPIResult
{
    /*
     * status == SUCCESS
     */
    @JsonProperty( "linkedAccounts", [LinkedAccount] )
    public linkedAccounts: LinkedAccount[] = undefined;

    /*
     * status = INFORMATION_NEEDED
     */
    @JsonProperty( "informationType", String )
    public informationType: string = undefined;

    @JsonProperty( "securityQuestion", String )
    public securityQuestion: string = undefined;

    @JsonProperty( "securityOptions", [String] )
    public securityOptions: string[] = undefined;

    public isInformationNeeded(): boolean
    {
        return this.status == "INFORMATION_NEEDED";
    }
}
