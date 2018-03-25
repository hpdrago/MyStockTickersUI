import { TradeItAPIResult } from "./tradeit-api-result";
import { JsonObject, JsonProperty } from "json2typescript";
import { LinkedAccount } from "../../../model/entity/linked-account";
import { TradeItAccount } from "../../../model/entity/tradeit-account";

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

    @JsonProperty( "tradeItAccount", TradeItAccount )
    public tradeItAccount: TradeItAccount = undefined;

    /*
     * status = INFORMATION_NEEDED
     */
    @JsonProperty( "informationType", String )
    public informationType: string = undefined;

    @JsonProperty( "securityQuestion", String )
    public securityQuestion: string = undefined;

    @JsonProperty( "securityQuestionOptions", [String] )
    public securityQuestionOptions: string[] = undefined;

    /**
     * Determines if the user should be asked security questions.
     * @return {boolean}
     */
    public isInformationNeeded(): boolean
    {
        return this.status == "INFORMATION_NEEDED";
    }

    /**
     * Creates an ok result instance.
     * @return {TradeItAuthenticateResult}
     * @constructor
     */
    public static OK(): TradeItAuthenticateResult
    {
        let okResult = new TradeItAuthenticateResult();
        okResult.status = TradeItAPIResult.SUCCESS;
        okResult.linkedAccounts = [];
        return okResult;
    }
}
