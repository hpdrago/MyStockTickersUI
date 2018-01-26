import { RestErrorReporter } from "../rest-error-reporter";
import { BaseCrudComponent } from "../../component/crud/common/base-crud.component";
import { RestException } from "../../common/rest-exception";
import { ToastsManager } from "ng2-toastr";

/**
 * This class encapsulates reporting REST errors.
 */
export class CrudRestErrorReporter extends RestErrorReporter
{
    /**
     * Constructor.
     * @param {BaseCrudComponent<any>} crudComponent
     */
    constructor( protected toaster: ToastsManager,
                 private crudComponent: BaseCrudComponent<any> )
    {
        super( toaster );
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
