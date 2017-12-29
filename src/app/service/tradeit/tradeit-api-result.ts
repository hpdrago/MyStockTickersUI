/**
 * This is the base class for all Tradeit API messages containing the common result and status properties.
 *
 * Created 12/7/2017
 */
import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject
export class TradeItApiResult
{
    @JsonProperty( "status", String )
    public status: string = undefined;

    @JsonProperty( "token", String )
    public token: string = "";

    @JsonProperty( "shortMessage", String )
    public shortMessage: string = "";

    @JsonProperty( "longMessages", [String] )
    public longMessages: string[] = [];

    public getMessages(): string
    {
        var messages: string;
        messages = this.shortMessage + ". " + this.longMessages;
        return messages;
    }
}
