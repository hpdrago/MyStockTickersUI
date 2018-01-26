import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';

@Injectable()
export class AppDefaultErrorHandler implements ErrorHandler
{
    constructor( private injector: Injector )
    {
    }

    public handleError( error )
    {
        const toaster: ToastsManager = this.injector.get( ToastsManager );
        console.error( error );
        toaster.error( error, "Error", {toastLife: 20 * 1000 } );
        throw error;
    }
}
