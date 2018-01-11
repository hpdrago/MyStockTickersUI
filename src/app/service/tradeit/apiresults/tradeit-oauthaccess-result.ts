import { TradeItAPIResult } from "./tradeit-api-result";
import { JsonObject, JsonProperty } from "json2typescript";
import { CustomerAccount } from "../../../model/entity/customer-account";

/**
 * This class contains the data returned from the REST call for the TradeIt getOAuthAccess call.
 */
@JsonObject
export class TradeItOAuthAccessResult extends TradeItAPIResult
{
    @JsonProperty( "customerAccount", CustomerAccount )
    public customerAccount: CustomerAccount = undefined;
}
