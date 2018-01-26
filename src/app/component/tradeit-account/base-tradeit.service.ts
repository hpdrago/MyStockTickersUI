import { BaseService } from "../../service/base-service";
import { TradeItException } from "../../service/tradeit/tradeit-execption";
import { ToastsManager } from "ng2-toastr";
import { RestErrorReporter } from "../../service/rest-error-reporter";
import { RestException } from "../../common/rest-exception";

/**
 * This is the base class for the TradeIt Services.
 */
export class BaseTradeItService extends BaseService
{
    constructor( protected toaster: ToastsManager,
                 protected restErrorReporter: RestErrorReporter )
    {
        super( toaster );
    }

    /**
     * Reports the error to the console and a visible message to the user.
     * @param rawJsonError The JSON text returned from the REST call
     */
    protected reportRestError( rawJsonError ): RestException
    {
        this.log( "reportRestError: " + JSON.stringify( rawJsonError ) );
        var restException: RestException = this.restErrorReporter.reportRestError( rawJsonError );
        return restException;
    }

    /**
     * Reports the error using the {@code toaster} and extracts the error information and returns that in the
     * return result.
     * @param {string} rawJsonError
     * @returns {TradeItException}
     */
    protected reportTradeItError( rawJsonError ): TradeItException
    {
        let exception: TradeItException = TradeItException.createException( rawJsonError );
        this.log( "Messages: " + exception.getMessages() );
        this.toaster.error( exception.getMessages(), "Error" )
        return exception;
    }
}
