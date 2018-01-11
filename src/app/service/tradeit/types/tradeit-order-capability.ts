import { TradeItDisplayLabelValue } from "./tradeit-display-label-value";

/**
 * This class defines the fields of the TradeIt OrderCapability.
 */
export class TradeItOrderCapability
{
    public instrument: string;
    public actions: TradeItDisplayLabelValue;
    public priceTypes: TradeItDisplayLabelValue;
    public expirationTypes: TradeItDisplayLabelValue;
}
