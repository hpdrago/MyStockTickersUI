import { RestErrorReporter } from "../rest-error-reporter";
import { BaseCrudComponent } from "../../component/crud/common/base-crud.component";
import { RestException } from "../../common/rest-exception";

/**
 * This class encapsulates reporting REST errors.
 */
export class CrudRestErrorReporter extends RestErrorReporter
{
    /**
     * Constructor.
     * @param {BaseCrudComponent<any>} crudComponent
     */
    constructor( private crudComponent: BaseCrudComponent<any> )
    {
        super();
    }

    /**
     * Format the exception messages.
     * @param {RestException} restException
     * @return {string}
     */
    public getExceptionMessage( restException: RestException ): string
    {
        var message: string = "";
        if ( restException.isDuplicateKeyExists() )
        {
            message = this.crudComponent.getDuplicateKeyErrorMessage();
        }
        else
        {
            message = super.getExceptionMessage( restException );
        }
        return message;
    }
}
