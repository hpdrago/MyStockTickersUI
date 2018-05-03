import { ModelObject } from "./modelobject";
import { JsonObject, JsonProperty } from "json2typescript";
import { DateConverter } from "../common/DateConverter";

/**
 * This is the child (1 to Many) record of a {@code TradeItAccount}.  It contains the information for a brokerage account
 * for the user.
 */
@JsonObject
export class LinkedAccount extends ModelObject<LinkedAccount>
{
    @JsonProperty( "id", String )
    public id: string = undefined;

    @JsonProperty( "customerId", String )
    public customerId: string = undefined;

    @JsonProperty( "tradeItAccountId", String )
    public tradeItAccountId: string = undefined;

    @JsonProperty( "accountNumber", String )
    public accountNumber: string = undefined;

    @JsonProperty( "accountName", String )
    public accountName: string = undefined;

    @JsonProperty( "accountIndex", Number )
    public accountIndex: number = undefined;

    @JsonProperty( "createDate", DateConverter )
    public createDate: Date = undefined;

    @JsonProperty( "updateDate", DateConverter )
    public updateDate: Date = undefined;

    @JsonProperty( "availableCash", Number )
    public availableCash: number = undefined;

    @JsonProperty( "buyingPower", Number )
    public buyingPower: number = undefined;

    @JsonProperty( "totalValue", Number )
    public totalValue: number = undefined;

    @JsonProperty( "dayAbsoluteReturn", Number )
    public dayAbsoluteReturn: number = undefined;

    @JsonProperty( "dayPercentReturn", Number )
    public dayPercentReturn: number = undefined;

    @JsonProperty( "totalAbsoluteReturn", Number )
    public totalAbsoluteReturn: number = undefined;

    @JsonProperty( "totalPercentReturn", Number )
    public totalPercentReturn: number = undefined;

    @JsonProperty( "marginCash", Number )
    public marginCash: number = undefined;

    @JsonProperty( "loadingStatus", String )
    public loadingStatus: string = undefined;

    public getPrimaryKeyValue(): any
    {
        return this.id;
    }

    public getPrimaryKeyName(): string
    {
        return "id";
    }

}
