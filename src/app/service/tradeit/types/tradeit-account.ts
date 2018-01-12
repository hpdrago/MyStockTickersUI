import { TradeItOrderCapability } from "./tradeit-order-capability";
import { JsonObject, JsonProperty } from "json2typescript";

/**
 * This class contains the fields of the TradeIt Account.
 */
@JsonObject
export class TradeItAccount
{
    @JsonProperty( "accountNumber", String )
    public accountNumber: string = undefined;

    @JsonProperty( "name", String )
    public name: string = undefined;

    @JsonProperty( "accountBaseCurrency", String )
    public accountBaseCurrency: string = undefined;

    @JsonProperty( "accountIndex", String )
    public accountIndex: string = undefined;

    @JsonProperty( "userCanDisableMargin", String )
    public userCanDisableMargin: string = undefined;

    @JsonProperty( "orderCapability", TradeItOrderCapability )
    public orderCapabilities: TradeItOrderCapability[] = undefined;
}
