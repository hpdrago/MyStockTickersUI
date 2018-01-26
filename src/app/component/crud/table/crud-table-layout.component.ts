import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { CrudTableLayoutBaseComponent } from './crud-table-layout-base.component';
import { CookieService } from 'ngx-cookie-service';
import { CrudTableColumnSelectorDialogComponent } from './crud-table-column-selector-dialog.component';

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
     * Column customizer.
     */
    @ViewChild(CrudTableColumnSelectorDialogComponent)
    private _crudTableColumnSelectorDialogComponent: CrudTableColumnSelectorDialogComponent;

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

    protected getCrudTableColumnSelectorDialogComponent(): CrudTableColumnSelectorDialogComponent
    {
        return this._crudTableColumnSelectorDialogComponent;
    }

    public get crudTableColumnSelectorDialogComponent(): CrudTableColumnSelectorDialogComponent
    {
        return this._crudTableColumnSelectorDialogComponent;
    }
}
