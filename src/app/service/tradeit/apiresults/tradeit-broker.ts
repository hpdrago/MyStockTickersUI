/**
 * This class contains the properties for a Broker
 *
 * Created 12/7/2017
 */
import { TradeItBrokerInstrument } from "./tradeit-broker-instrument";

export class TradeItBroker
{
    public shortName: string;
    public longName: string;
    public userName: string;
    public brokerInstruments: TradeItBrokerInstrument[];
}
