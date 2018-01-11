import { TradeItAPIResult } from "./tradeit-api-result";
import { TradeItBroker } from "../types/tradeit-broker";

export class TradeItBrokerListResult extends TradeItAPIResult
{
    public brokerList: TradeItBroker[];
}
