import { ModelObject } from "./modelobject";
/**
 * Defines a single portfolio for a customer
 * Created by mike on 10/23/2016.
 */
export class Portfolio extends ModelObject<Portfolio>
{
    public id: number;
    public customerId: number;
    public name: string;
    public realizedGL: number;
    public unrealizedGL: number;
    public marketValue: number;

    public getPrimaryKey(): any
    {
        return this.id;
    }
}
