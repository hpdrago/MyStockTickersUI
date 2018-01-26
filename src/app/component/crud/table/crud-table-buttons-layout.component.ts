import { Component, Input, TemplateRef } from "@angular/core";
import { CrudTableButtonsBaseComponent } from './crud-table-buttons-base.component';

/**
 * This is the base component class for the buttons on all CRUD enabled tables.
 * Five buttons are managed:
 *   - Delete button
 *   - Add button
 *   - Edit button
 *   - Refresh button
 *   - Customize button
 *
 * Created by mike on 1/2/2017.
 */
@Component({
    selector: 'crud-table-buttons',
    template: ` <ng-template #customizeButtonTemplate>
                    <crud-table-customize-button>
                    </crud-table-customize-button>
                </ng-template>
                <div style="text-align: center">
                   <ng-container *ngTemplateOutlet="editButtonTemplate">
                   </ng-container>
                   <ng-container *ngTemplateOutlet="addButtonTemplate">
                   </ng-container>
                   <ng-container *ngTemplateOutlet="deleteButtonTemplate">
                   </ng-container>
                   <ng-container *ngTemplateOutlet="refreshButtonTemplate">
                   </ng-container>
                    <!--
                   <div *ngIf="includeCustomizeButton">
                       <ng-container *ngTemplateOutlet="customizeButtonTemplate">
                       </ng-container>
                   </div>
                   -->
               </div>
              `
})
export class CrudTableButtonsLayoutComponent
{
    @Input()
    protected includeCustomizeButton: boolean = false;

    @Input()
    protected refreshButtonTemplate: TemplateRef<any>;

    @Input()
    protected addButtonTemplate: TemplateRef<any>;

    @Input()
    protected editButtonTemplate: TemplateRef<any>;

    @Input()
    protected deleteButtonTemplate: TemplateRef<any>;
}
