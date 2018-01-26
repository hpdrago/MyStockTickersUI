import { Component } from "@angular/core";

/**
 * Created by mike on 5/29/2018.
 */
@Component({
    selector:  'gains-losses-table-buttons',
    template: `<ng-template #addButtonTemplate>
                    <gains-losses-table-add-button>
                    </gains-losses-table-add-button>
               </ng-template>
               <ng-template #editButtonTemplate>
                    <gains-losses-table-edit-button>
                    </gains-losses-table-edit-button>
               </ng-template>
               <ng-template #deleteButtonTemplate>
                    <gains-losses-table-delete-button>
                    </gains-losses-table-delete-button>
               </ng-template>
               <ng-template #refreshButtonTemplate>
                    <gains-losses-table-refresh-button>
                    </gains-losses-table-refresh-button>
               </ng-template>
               <ng-template #importButtonTemplate>
                   <gains-losses-table-import-button>
                   </gains-losses-table-import-button>
               </ng-template>
               <crud-table-buttons [addButtonTemplate]="addButtonTemplate"
                                   [editButtonTemplate]="editButtonTemplate"
                                   [deleteButtonTemplate]="deleteButtonTemplate"
                                   [refreshButtonTemplate]="refreshButtonTemplate"
                                   [importButtonTemplate]="importButtonTemplate">
               </crud-table-buttons>
    `
})
export class GainsLossesTableButtonsComponent
{
}
