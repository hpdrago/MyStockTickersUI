import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { isNullOrUndefined } from 'util';
import { RestException } from './common/rest-exception';
import { RestErrorReporter } from './service/rest-error-reporter';

@Injectable()
export class AppDefaultErrorHandler implements ErrorHandler
{
    constructor( private injector: Injector )
    {
    }

    public handleError( error )
    {
        if ( !isNullOrUndefined( error ))
        {
            const toaster: ToastsManager = this.injector.get( ToastsManager );
            const restErrorReporter: RestErrorReporter = this.injector.get( RestErrorReporter );
            console.error( "Default Error handler: " + error );
            if ( error instanceof RestException )
            {
                restErrorReporter.reportRestError( error );
            }
            else
            {
                toaster.error( error, "Error", {toastLife: 20 * 1000} );
            }
        }
        throw error;
    }
}
