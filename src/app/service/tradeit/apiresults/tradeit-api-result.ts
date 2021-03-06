/**
 * This is the base class for all Tradeit API messages containing the common result and status properties.
 *
 * Created 12/7/2017
 */
import { JsonConvert, JsonObject, JsonProperty, OperationMode, ValueCheckingMode } from "json2typescript";

@JsonObject
export class TradeItAPIResult
{
    public static readonly SUCCESS = 'SUCCESS';
    @JsonProperty( "code", Number )
    public code: number = undefined;

    @JsonProperty( "errorMessage", String )
    public errorMessage: string = undefined;

    @JsonProperty( "status", String )
    public status: string = undefined;

    @JsonProperty( "token", String )
    public token: string = "";

    @JsonProperty( "shortMessage", String )
    public shortMessage: string = "";

    @JsonProperty( "longMessages", [String] )
    public longMessages: string[] = [];

    /**
     * Combines the short and long messages.
     * @return {string}
     */
    public getMessages(): string
    {
        var messages: string;
        messages = this.shortMessage + ". " + this.longMessages;
        return messages;
    }

    /**
     * Converts the rawJson into a TradeItAPIResult instance.
     * @param rawJson
     * @returns {TradeItAPIResult}
     */
    public static newInstance( rawJson ): TradeItAPIResult
    {
        let jsonConvert: JsonConvert = new JsonConvert();
        jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
        jsonConvert.operationMode = OperationMode.LOGGING;
        let apiResult: TradeItAPIResult = jsonConvert.deserialize( rawJson, TradeItAPIResult );
        return apiResult;
    }

    /**
     * Determines the result was an error.
     * @return {boolean}
     */
    public isError(): boolean
    {
        return this.status == "ERROR";
    }

    /**
     * Determines the result was successful.
     * @return {boolean}
     */
    public isSuccess(): boolean
    {
        return this.status == TradeItAPIResult.SUCCESS;
    }
}
