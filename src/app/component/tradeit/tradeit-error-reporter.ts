import { TradeItException } from "../../service/tradeit/tradeit-execption";
import { Injectable } from "@angular/core";
import { BaseClass } from "../../common/base-class";
import { ToastsManager } from "ng2-toastr";

/**
 * Reports TradeIt errors to the log and to this toaster.
 */
@Injectable()
export class TradeItErrorReporter extends BaseClass
{
    /**
     * Constructor
     * @param {ToastsManager} toaster
     */
    constructor( protected toaster?: ToastsManager )
    {
        super( toaster );
    }

    /**
     * Reports the error using the {@code toaster} and extracts the error information and returns that in the
     * return result.
     * @param {string} rawJsonError
     * @returns {TradeItException}
     */
    public reportError( rawJsonError ): TradeItException
    {
        let exception: TradeItException = TradeItException.createException( rawJsonError );
        this.log( "Messages: " + exception.getMessages() );
        this.toaster.error( exception.getMessages(), "Error" )
        return exception;
    }
}
