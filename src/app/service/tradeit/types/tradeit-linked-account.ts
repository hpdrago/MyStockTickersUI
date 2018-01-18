import { TradeItOrderCapability } from "./tradeit-order-capability";
import { JsonObject, JsonProperty } from "json2typescript";

/**
 * This class contains the fields of the TradeIt Account.
 */
@JsonObject
export class TradeItLinkedAccount
{
    @JsonProperty( "id", String )
    public id: number = undefined;

    @JsonProperty( "accountNumber", String )
    public accountNumber: string = undefined;

    @JsonProperty( "name", String )
    public name: string = undefined;

    @JsonProperty( "accountBaseCurrency", String )
    public accountBaseCurrency: string = undefined;

    @JsonProperty( "accountIndex", String )
    public accountIndex: string = undefined;

    @JsonProperty( "userCanDisableMargin", String )
    public userCanDisableMargin: string = undefined;

    @JsonProperty( "orderCapability", TradeItOrderCapability )
    public orderCapabilities: TradeItOrderCapability[] = undefined;

    @JsonProperty( "createDate", Date )
    public createDate: Date = undefined;

    @JsonProperty( "updateDate", Date )
    public updateDate: Date = undefined;

    @JsonProperty( "availableCash", Number )
    public availableCash: number = undefined;

    @JsonProperty( "buyingPower", Number )
    public buyingPower: number = undefined;

    @JsonProperty( "totalValue", Number )
    public totalValue: number = undefined;

    @JsonProperty( "dayAbsoluteReturn", Number  )
    public dayAbsoluteReturn: number = undefined;

    @JsonProperty( "dayPercentReturn", Number )
    public dayPercentReturn: number = undefined;

    @JsonProperty( "totalAbsoluteReturn", Number )
    public totalAbsoluteReturn: number = undefined;

    @JsonProperty( "totalPercentReturn", Number )
    public totalPercentReturn: number = undefined;

    @JsonProperty( "marginCash", Number )
    public marginCash: number = undefined;

}
