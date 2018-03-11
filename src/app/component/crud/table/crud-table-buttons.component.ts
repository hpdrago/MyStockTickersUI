import { Component, Input, TemplateRef } from "@angular/core";

/**
 * This is the base component class for the buttons on all CRUD enabled tables.
 * Four buttons are managed:
 *   - Delete button
 *   - Add button
 *   - Edit button
 *   - Refresh button
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
              `
})
export class CrudTableButtonsComponent
{
    @Input('refreshButtonTemplate')
    private refreshButtonTemplate: TemplateRef<any>;

    @Input('addButtonTemplate')
    private addButtonTemplate: TemplateRef<any>;

    @Input('editButtonTemplate')
    private editButtonTemplate: TemplateRef<any>;

    @Input('deleteButtonTemplate')
    private deleteButtonTemplate: TemplateRef<any>;
}
