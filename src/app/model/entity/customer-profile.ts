import { ModelObject } from '../common/model-object';

export class CustomerProfile extends ModelObject<CustomerProfile>
{
    public id: string;

    getPrimaryKeyValue(): any
    {
        return this.id;
    }

    getPrimaryKeyName(): string
    {
        return "id";
    }

}
