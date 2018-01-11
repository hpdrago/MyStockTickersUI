import { TradeItOrderCapability } from "./tradeit-order-capability";

/**
 * This class contains the fields of the TradeIt Account.
 */
export class TradeItAccount
{
    public accountNumber: string;
    public name: string;
    public accountBaseCurrency: string;
    public accountIndex: string;
    public userCanDisableMargin: string;
    public orderCapabilities: TradeItOrderCapability[] ;
}
