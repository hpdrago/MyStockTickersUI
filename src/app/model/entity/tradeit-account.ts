/**
 * Created by mike on 11/11/2017
 */
import { ModelObject } from "./modelobject";
import { JsonObject, JsonProperty } from "json2typescript";
import { isNullOrUndefined } from "util";
import { LinkedAccount } from "./linked-account";
import { DateConverter } from "../common/DateConverter";

/**
 * TradeItLinkedAccount DTO
 *
 * Created 12/4/2017
 */
@JsonObject
export class TradeItAccount extends ModelObject<TradeItAccount>
{
    @JsonProperty( "id", Number )
    public id: number = undefined;

    @JsonProperty( "customerId", Number )
    public customerId: number = undefined;

    @JsonProperty( "name", String )
    public name: string = undefined;

    @JsonProperty( "brokerage", String )
    public brokerage: string = undefined;

    @JsonProperty( "authTimestamp", DateConverter )
    public authTimestamp: Date = undefined;

    public linkedAccounts: LinkedAccount[] = undefined;

    public getPrimaryKeyValue(): any
    {
        return this.id;
    }

    public getPrimaryKeyName(): string
    {
        return "id";
    }

    /**
     * Determines if the user's last authentication time is within the timeout period of 15 minutes
     * @return {boolean} true if the user is still authenticated.  False otherwise.
     */
    public isAuthenticated(): boolean
    {
        if ( isNullOrUndefined( this.authTimestamp ) )
        {
            return false;
        }
        else
        {
            let authTimestamp = new Date( this.authTimestamp );
            var diffMins = authTimestamp.getMilliseconds()/(60 * 1000 * 1000)
            return diffMins < 15;
        }
    }
}
