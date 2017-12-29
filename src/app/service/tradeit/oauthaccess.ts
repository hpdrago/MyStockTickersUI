import { TradeItApiResult } from "./tradeit-api-result";
import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject
export class OAuthAccess extends TradeItApiResult
{
    @JsonProperty( "userId", String )
    public userId = "";

    @JsonProperty( "userToken", String )
    public userToken = "";
}
