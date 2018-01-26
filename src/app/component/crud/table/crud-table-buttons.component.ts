import { Component, Input, TemplateRef } from "@angular/core";

/**
 * This is the base component class for the buttons on all CRUD enabled tables.
 * Four buttons are managed:
 *   - Delete button
 *   - Add button
 *   - Edit button
 *   - Refresh button
 *   - Customize button
 *
 * Created by mike on 1/2/2017.
 */
@Component({
    selector:'crud-table-buttons',
    template: `<ng-container *ngTemplateOutlet="editButtonTemplate">
               </ng-container>
               <ng-container *ngTemplateOutlet="addButtonTemplate">
               </ng-container>
               <ng-container *ngTemplateOutlet="deleteButtonTemplate">
               </ng-container>
               <ng-container *ngTemplateOutlet="refreshButtonTemplate">
               </ng-container>
               <ng-container *ngTemplateOutlet="customizeButtonTemplate">
               </ng-container>
              `
})
export class CrudTableButtonsComponent
{
    @Input('refreshButtonTemplate')
    protected refreshButtonTemplate: TemplateRef<any>;

    @Input('addButtonTemplate')
    protected addButtonTemplate: TemplateRef<any>;

    @Input('editButtonTemplate')
    protected editButtonTemplate: TemplateRef<any>;

    @Input('deleteButtonTemplate')
    protected deleteButtonTemplate: TemplateRef<any>;

    @Input('customizeButtonTemplate')
    protected customizeButtonTemplate: TemplateRef<any>;
}
