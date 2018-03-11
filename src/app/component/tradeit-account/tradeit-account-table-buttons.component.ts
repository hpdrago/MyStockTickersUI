import { Component } from "@angular/core";

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector:  'tradeit-account-table-buttons',
    template: `<ng-template #addButtonTemplate>
                   <tradeit-account-table-add-button>
                   </tradeit-account-table-add-button>
               </ng-template>
               <ng-template #editButtonTemplate>
                   <tradeit-account-table-edit-button>
                   </tradeit-account-table-edit-button>
               </ng-template>
               <ng-template #deleteButtonTemplate>
                   <tradeit-account-table-delete-button>
                   </tradeit-account-table-delete-button>
               </ng-template>
               <ng-template #refreshButtonTemplate>
                   <tradeit-account-table-refresh-button>
                   </tradeit-account-table-refresh-button>
               </ng-template>
               <crud-table-buttons [addButtonTemplate]="addButtonTemplate"
                                   [editButtonTemplate]="editButtonTemplate"
                                   [deleteButtonTemplate]="deleteButtonTemplate"
                                   [refreshButtonTemplate]="refreshButtonTemplate">
               </crud-table-buttons>`
})
export class TradeItAccountTableButtonsComponent
{
}
