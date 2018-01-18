import { TradeItAPIResult } from "./tradeit-api-result";
import { JsonObject, JsonProperty } from "json2typescript";

/**
 * This class contains the values returns from the call to the backend services to get the OAuth popup URL from TradeIt.
 */
@JsonObject
export class TradeItGetOauthPopupURLResult extends TradeItAPIResult
{
    @JsonProperty( "oAuthURL", String )
    public oAuthURL: string;
}
