import { ModelObject } from "./modelobject";

/**
 * Defines a single portfolio for a customer
 * Created by mike on 10/23/2016.
 */
export class Portfolio extends ModelObject<Portfolio>
{
    public id: string;
    public customerId: string;
    public name: string;
    public realizedGL: number;
    public unrealizedGL: number;
    public marketValue: number;

    public getPrimaryKeyValue(): any
    {
        return this.id;
    }

    public getPrimaryKeyName(): string
    {
        return "id";
    }
}
