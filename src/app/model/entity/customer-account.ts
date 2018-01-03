/**
 * Created by mike on 11/11/2017
 */
import { ModelObject } from "./modelobject";
import { JsonObject, JsonProperty } from "json2typescript";

/**
 * CustomerAccount DTO
 *
 * Created 12/4/2017
 */
@JsonObject
export class CustomerAccount extends ModelObject<CustomerAccount>
{
    @JsonProperty( "id", Number )
    public id: number;

    @JsonProperty( "customerId", Number )
    public customerId: number;

    @JsonProperty( "name", String )
    public name: string;

    @JsonProperty( "brokerage", String )
    public brokerage: string;

    public getPrimaryKey(): any
    {
        return this.id;
    }

}
