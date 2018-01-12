/**
 * This class contains the properties for a Broker
 *
 * Created 12/7/2017
 */
import { TradeItBrokerInstrument } from "./tradeit-broker-instrument";
import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject
export class TradeItBroker
{
    @JsonProperty( "shortName", String )
    public shortName: string;

    @JsonProperty( "longName", String )
    public longName: string;

    @JsonProperty( "userName", String )
    public userName: string;

    @JsonProperty( "brokerInstruments", TradeItBrokerInstrument )
    public brokerInstruments: TradeItBrokerInstrument[];
}
