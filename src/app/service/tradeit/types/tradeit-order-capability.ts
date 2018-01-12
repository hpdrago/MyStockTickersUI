import { TradeItDisplayLabelValue } from "./tradeit-display-label-value";
import { JsonObject, JsonProperty } from "json2typescript";

/**
 * This class defines the fields of the TradeIt OrderCapability.
 */
@JsonObject
export class TradeItOrderCapability
{
    @JsonProperty( "instrument", String )
    public instrument: string = undefined;

    @JsonProperty( "actions", TradeItDisplayLabelValue )
    public actions: TradeItDisplayLabelValue = undefined;

    @JsonProperty( "priceTypes", TradeItDisplayLabelValue )
    public priceTypes: TradeItDisplayLabelValue = undefined;

    @JsonProperty( "experationTypes", TradeItDisplayLabelValue )
    public expirationTypes: TradeItDisplayLabelValue = undefined;
}
