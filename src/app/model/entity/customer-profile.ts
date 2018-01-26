import { ModelObject } from './modelobject';

export class CustomerProfile extends ModelObject<CustomerProfile>
{
    public id: number;

    getPrimaryKeyValue(): any
    {
        return this.id;
    }

    getPrimaryKeyName(): string
    {
        return "id";
    }

}
