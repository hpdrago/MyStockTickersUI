/**
 * Created by mike on 11/11/2017
 */
import { ModelObject } from "../common/model-object";

export class Customer extends ModelObject<Customer>
{
    public id: string;
    public email: string;

    public getPrimaryKeyValue(): any
    {
        return this.id;
    }

    public getPrimaryKeyName(): string
    {
        return "id";
    }
}
