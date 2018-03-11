import { Component } from "@angular/core";

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector: 'stock-notes-table-buttons',
    template: `<ng-template #addButtonTemplate>
                    <stock-notes-table-add-button>
                    </stock-notes-table-add-button>
               </ng-template>
               <ng-template #editButtonTemplate>
                    <stock-notes-table-edit-button>
                    </stock-notes-table-edit-button>
               </ng-template>
               <ng-template #deleteButtonTemplate>
                    <stock-notes-table-delete-button>
                    </stock-notes-table-delete-button>
               </ng-template>
               <ng-template #refreshButtonTemplate>
                    <stock-notes-table-refresh-button>
                    </stock-notes-table-refresh-button>
               </ng-template>
               <crud-table-buttons [addButtonTemplate]="addButtonTemplate"
                                   [editButtonTemplate]="editButtonTemplate"
                                   [deleteButtonTemplate]="deleteButtonTemplate"
                                   [refreshButtonTemplate]="refreshButtonTemplate">
               </crud-table-buttons>`
})
export class StockNotesTableButtonsComponent
{
}
