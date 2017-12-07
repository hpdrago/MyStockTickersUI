/**
 * This class contains the properties for a Broker
 *
 * Created 12/7/2017
 */
import { TradeitBrokerInstrument } from "./tradeit-broker-instrument";

export class TradeitBroker
{
    public shortName: string;
    public longName: string;
    public userName: string;
    public brokerInstruments: TradeitBrokerInstrument[];
    public logos: string[];
}
