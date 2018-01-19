import { ModelObject } from "./modelobject";
import { JsonObject, JsonProperty } from "json2typescript";

/**
 * This is the child (1 to Many) record of a {@code TradeItAccount}.  It contains the information for a brokerage account
 * for the user.
 */
@JsonObject
export class LinkedAccount extends ModelObject<LinkedAccount>
{
    @JsonProperty( "id", Number )
    public id: number;

    @JsonProperty( "customerId", Number )
    public customerId: number;

    @JsonProperty( "parentAccountId", Number )
    public parentAccountId: number;

    @JsonProperty( "accountNumber", String )
    public accountNumber: string;

    @JsonProperty( "accountName", String )
    public accountName: string;

    @JsonProperty( "accountIndex", Number )
    public accountIndex: number;

    @JsonProperty( "createDate", Date )
    public createDate: Date;

    @JsonProperty( "updateDate", Date )
    public updateDate: Date;

    @JsonProperty( "availableCash", Number )
    public availableCash: number;

    @JsonProperty( "buyingPower", Number )
    public buyingPower: number;

    @JsonProperty( "totalValue", Number )
    public totalValue: number;

    @JsonProperty( "dayAbsoluteReturn", Number )
    public dayAbsoluteReturn: number;

    @JsonProperty( "dayPercentReturn", Number )
    public dayPercentReturn: number;

    @JsonProperty( "totalAbsoluteReturn", Number )
    public totalAbsoluteReturn: number;

    @JsonProperty( "totalPercentReturn", Number )
    public totalPercentReturn: number;

    @JsonProperty( "marginCash", Number )
    public marginCash: number;

    public getPrimaryKeyValue(): any
    {
        return this.id;
    }

    public getPrimaryKeyName(): string
    {
        return "id";
    }

}
