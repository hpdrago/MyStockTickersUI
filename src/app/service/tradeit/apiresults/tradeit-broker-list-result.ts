import { TradeItAPIResult } from "./tradeit-api-result";
import { TradeItBroker } from "./tradeit-broker";

export class TradeItBrokerListResult extends TradeItAPIResult
{
    public brokerList: TradeItBroker[];
}
