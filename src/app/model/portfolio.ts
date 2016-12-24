import { ModelObject } from "./base-modelobject";
/**
 * Defines a single portfolio for a customer
 * Created by mike on 10/23/2016.
 */
export class Portfolio extends ModelObject<Portfolio>
{
    public id: number;
    public customerId: number;
    public name: string;

    clone(): Portfolio
    {
        return undefined;
    }
}
