import { TradeItAPIResult } from "./tradeit-api-result";
import { JsonConvert, JsonObject, JsonProperty, OperationMode, ValueCheckingMode } from "json2typescript";

/**
 * This class contains the values returns from the call to the backend services to get the OAuth popup URL from TradeIt.
 */
@JsonObject
export class TradeItGetOauthPopupURLResult extends TradeItAPIResult
{
    @JsonProperty( "oAuthURL", String )
    public oAuthURL: string = undefined;

    /**
     * Converts the rawJson into a TradeItAPIResult instance.
     * @param rawJson
     * @returns {TradeItAPIResult}
     */
    public static newInstance( rawJson ): TradeItGetOauthPopupURLResult
    {
        let jsonConvert: JsonConvert = new JsonConvert();
        jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
        jsonConvert.operationMode = OperationMode.LOGGING;
        let apiResult: TradeItGetOauthPopupURLResult = jsonConvert.deserialize( rawJson, TradeItGetOauthPopupURLResult );
        return apiResult;
    }
}
