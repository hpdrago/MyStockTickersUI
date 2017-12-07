import { TradeitApiResult } from "./tradeit-api-result";
import { TradeitBroker } from "./tradeit-broker";

export class TradeitBrokerList extends TradeitApiResult
{
    public brokerList: TradeitBroker[];
}
