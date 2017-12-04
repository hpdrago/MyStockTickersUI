/**
 * Created by mike on 11/11/2017
 */
import { ModelObject } from "./modelobject";

/**
 * CustomerAccount DTO
 *
 * Created 12/4/2017
 */
export class CustomerAccount extends ModelObject<CustomerAccount>
{
    public id: number;
    public customerId: number;
    public name: string;
    public loginToken: string;
    public brokerage: string;

    public getPrimaryKey(): any
    {
        return this.id;
    }

}
