import { CrudOperation } from "../common/crud-operation";

/**
 * This class contains a modelObject and the crud operation that will be sent to the CRUD dialog so that it knows
 * the operation and the model object to display.
 */
export class DisplayDialogRequestSubjectInfo
{
    public modelObject: any;
    public crudOperation: CrudOperation;
}
