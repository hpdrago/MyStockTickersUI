import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { RestException } from './common/rest-exception';
import { RestErrorReporter } from './service/rest-error-reporter';
import { ToastsManager } from 'ng2-toastr';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
//import * as StackTrace from 'stacktrace-js';

@Injectable()
export class AppDefaultErrorHandler implements ErrorHandler
{
    private lastError: any;
    constructor( private injector: Injector )
    {
    }

    /**
     * https://medium.com/@amcdnl/global-error-handling-with-angular2-6b992bdfb59c
     * @param error
     */
    public handleError( error )
    {
        if ( !isNullOrUndefined( error ) && error != this.lastError )
        {
            const restErrorReporter: RestErrorReporter = this.injector.get( RestErrorReporter );
            const toaster: ToastsManager = this.injector.get( ToastsManager );
            const location = this.injector.get(LocationStrategy);
            const message = error.message ? error.message : error.toString();
            console.error( "Default Error handler: " + message );
            /*
            const url = location instanceof PathLocationStrategy ? location.path() : '';
            // get the stack trace, lets grab the last 10 stacks only
            StackTrace.fromError(error).then(stackframes =>
            {
                const stackString = stackframes
                    .splice(0, 20)
                    .map(function(sf) {
                        return sf.toString();
                    }).join('\n');
                console.error( "Default Error handler: " + message );
                console.error( "Default Error handler: " + stackString );
            });
            */
            if ( error instanceof RestException )
            {
                restErrorReporter.reportRestError( error );
            }
            else
            {
                toaster.error( message, "Error" );
            }
        }
        this.lastError = error;
        //throw error;
    }
}
