/**
 * This class contains the supported functions for each broker.
 */
import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject
export class TradeItBrokerInstrument
{
    @JsonProperty( "instrument", String )
    public instrument: string = undefined;

    @JsonProperty( "supportsAccountOverview", Boolean )
    public supportsAccountOverview: boolean = undefined;

    @JsonProperty( "supportsPositions", Boolean )
    public supportsPositions: boolean = undefined;

    @JsonProperty( "supportsTrading", Boolean )
    public supportsTrading: boolean = undefined;

    @JsonProperty( "supportsOrderStatus", Boolean )
    public supportsOrderStatus: boolean = undefined;

    @JsonProperty( "supportsInstrument", Boolean )
    public supportsInstrument: boolean = undefined;

    @JsonProperty( "supportsOrderCanceling", Boolean )
    public supportsOrderCanceling: boolean = undefined;

    @JsonProperty( "supportsFxRates", Boolean )
    public supportsFxRates: boolean = undefined;

    @JsonProperty( "isFeatured", Boolean )
    public isFeatured: boolean = undefined;
}
