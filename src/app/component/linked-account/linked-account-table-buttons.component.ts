import { Component } from "@angular/core";

/**
 * The buttons component for the linked accounts.
 * Created by mike on 1/19/2018
 */
@Component({
    selector:    'linked-account-table-buttons',
    template: `<ng-template #addButtonTemplate>
                   <linked-account-table-add-button>
                   </linked-account-table-add-button>
               </ng-template>
               <ng-template #editButtonTemplate>
                   <linked-account-table-edit-button>
                   </linked-account-table-edit-button>
               </ng-template>
               <ng-template #deleteButtonTemplate>
                   <linked-account-table-delete-button>
                   </linked-account-table-delete-button>
               </ng-template>
               <ng-template #refreshButtonTemplate>
                   <linked-account-table-refresh-button>
                   </linked-account-table-refresh-button>
               </ng-template>
               <crud-table-buttons [editButtonTemplate]="editButtonTemplate"
                                   [deleteButtonTemplate]="deleteButtonTemplate"
                                   [refreshButtonTemplate]="refreshButtonTemplate">
               </crud-table-buttons>`
})
export class LinkedAccountTableButtonsComponent
{
}
