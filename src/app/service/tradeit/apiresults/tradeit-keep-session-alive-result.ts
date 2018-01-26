import { TradeItAPIResult } from "./tradeit-api-result";
import { JsonConvert, JsonProperty, OperationMode, ValueCheckingMode } from "json2typescript";
import { TradeItAccount } from "../../../model/entity/tradeit-account";

/**
 * This class contains the values returned from a call to the backend services to keep a session alive for a TradeIt
 * account.
 */
export class TradeItKeepSessionAliveResult extends TradeItAPIResult
{
    @JsonProperty( "tradeItAccount", [TradeItAccount] )
    public tradeItAccount: TradeItAccount = undefined;

    /**
     * Converts the rawJson into a TradeItAPIResult instance.
     * @param rawJson
     * @returns {TradeItAPIResult}
     */
    public static newInstance( rawJson ): TradeItKeepSessionAliveResult
    {
        let jsonConvert: JsonConvert = new JsonConvert();
        jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
        jsonConvert.operationMode = OperationMode.LOGGING;
        let apiResult: TradeItKeepSessionAliveResult = jsonConvert.deserialize( rawJson, TradeItKeepSessionAliveResult );
        return apiResult;
    }
}
