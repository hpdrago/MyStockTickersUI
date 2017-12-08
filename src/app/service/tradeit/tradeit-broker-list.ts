import { TradeItApiResult } from "./tradeit-api-result";
import { TradeItBroker } from "./tradeit-broker";

export class TradeItBrokerList extends TradeItApiResult
{
    public brokerList: TradeItBroker[];
}
