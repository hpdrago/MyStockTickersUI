import { Component } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { CrudTableLayoutBaseComponent } from './crud-table-layout-base.component';
import { CookieService } from 'ngx-cookie-service';

/**
 * This component contains the layout (definition) of the crud table using the new PrimeNG turbo table.
 * This is a separate component because the crud table classes will define customizations to the table by providing
 * templates as input parameters thus allowing a generic table definition that is customizable for the numerous crud
 * tables in the app.
 */
@Component
({
    selector: 'crud-table-layout',
    templateUrl: './crud-table-layout.component.html'
 })
export class CrudTableLayoutComponent extends CrudTableLayoutBaseComponent
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {CookieService} cookieService
     */
    public constructor( protected toaster: ToastsManager,
                        protected cookieService: CookieService )
    {
        super( toaster,
               cookieService );
    }
}
