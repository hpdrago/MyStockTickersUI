/**
 * Created by mike on 10/10/2016.
 *
 * This class identifies the standard CRUD operations although READ isn't needed
 */
export enum CrudOperation
{
    NONE,
    CREATE,
    UPDATE,
    DELETE
}
export namespace CrudOperation
{
    export function getName( crudOperation: number ): string
    {
        var returnValue = 'ERROR ' + crudOperation;
        switch( crudOperation )
        {
            case 0:
                returnValue = 'NONE';
                break;
            case 1:
                returnValue = 'CREATE';
                break;
            case 2:
                returnValue = 'UPDATE';
                break;
            case 3:
                returnValue = 'DELETE';
                break;
        }
        return returnValue;
    }
}
