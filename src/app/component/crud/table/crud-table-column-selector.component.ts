import { BaseComponent } from '../../common/base.component';
import { Component, Input, Output } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { Column } from 'primeng/shared';

/**
 * This component allows the user to select and order the columns to be displayed in the table.
 */
@Component
({
    selector: 'crud-table-column-selector',
    template: `<p-pickList [source]="availableColumns" 
                           [target]="selectedColumns"
                           sourceHeader="Available Columns"
                           targetHeader="Selected Columns"
                           [dragdrop]="true">
                   <ng-template let-column pTemplate="item">
                       {{column.header}}
                   </ng-template>
               </p-pickList>`
 })
export class CrudTableColumnSelectorComponent extends BaseComponent
{
    @Input()
    protected availableColumns: Column[];

    @Input()
    protected selectedColumns: Column[];

    /**
     * Constructor
     * @param {ToastsManager} toaster
     */
    public constructor( protected toaster: ToastsManager )
    {
        super( toaster );
    }
}
