import { TradeItAPIResult } from "./tradeit-api-result";
import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject
export class TradeItGetOauthPopupURLResult extends TradeItAPIResult
{
    @JsonProperty( "oAuthURL", String )
    public oAuthURL: string;
}
