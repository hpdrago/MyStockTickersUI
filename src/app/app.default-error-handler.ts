import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { RestException } from './common/rest-exception';
import { RestErrorReporter } from './service/rest-error-reporter';
import { ToastsManager } from 'ng2-toastr';

@Injectable()
export class AppDefaultErrorHandler implements ErrorHandler
{
    private lastError: any;
    constructor( private injector: Injector )
    {
    }

    public handleError( error )
    {
        if ( !isNullOrUndefined( error ) && error != this.lastError )
        {
            const restErrorReporter: RestErrorReporter = this.injector.get( RestErrorReporter );
            const toaster: ToastsManager = this.injector.get( ToastsManager );
            console.error( "Default Error handler: " + error );
            if ( error instanceof RestException )
            {
                restErrorReporter.reportRestError( error );
            }
            else
            {
                toaster.error( error, "Error" );
            }
        }
        this.lastError = error;
        throw error;
    }
}
