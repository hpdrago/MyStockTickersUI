/**
 * Created by mike on 11/11/2017
 */
import { ModelObject } from "./modelobject";

export class Customer extends ModelObject<Customer>
{
    public id;

    public isEqualPrimaryKey( customer: Customer ): boolean
    {
        return this.id === customer.id;
    }

}
