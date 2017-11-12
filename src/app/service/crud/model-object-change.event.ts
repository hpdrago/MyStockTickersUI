/**
 * Created by mike on 11/12/2017
 */
import { CrudOperation } from "../../component/crud/common/crud-operation";
import { ModelObject } from "../../model/entity/modelobject";

/**
 * This class contains the information to send an event with the {@code ModelObjectChangeService}
 */
export class ModelObjectChangeEvent<T extends ModelObject<T>>
{
    public sender: any;
    public crudOperation: CrudOperation;
    public modelObject: T;

    constructor( sender: any,
                 crudOperation: CrudOperation,
                 modelObject: T )
    {
        this.sender = sender;
        this.crudOperation = crudOperation;
        this.modelObject = modelObject;
    }
}
