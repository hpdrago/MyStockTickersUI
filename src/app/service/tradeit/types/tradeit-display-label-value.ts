/**
 * This class defines the TradeIt DisplayLabelValue fields.
 */
import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject
export class TradeItDisplayLabelValue
{
    @JsonProperty( "displayLabel", String )
    public displayLabel: string = undefined;

    @JsonProperty( "value", String )
    public value: string = undefined;
}
