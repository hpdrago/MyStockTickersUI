import { Component } from "@angular/core";

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector: 'stock-catalyst-event-table-buttons',
    template: `<ng-template #addButtonTemplate>
                    <stock-catalyst-event-table-add-button>
                    </stock-catalyst-event-table-add-button>
               </ng-template>
               <ng-template #editButtonTemplate>
                    <stock-catalyst-event-table-edit-button>
                    </stock-catalyst-event-table-edit-button>
               </ng-template>
               <ng-template #deleteButtonTemplate>
                    <stock-catalyst-event-table-delete-button>
                    </stock-catalyst-event-table-delete-button>
               </ng-template>
               <ng-template #refreshButtonTemplate>
                    <stock-catalyst-event-table-refresh-button>
                    </stock-catalyst-event-table-refresh-button>
               </ng-template>
               <crud-table-buttons [addButtonTemplate]="addButtonTemplate"
                                   [editButtonTemplate]="editButtonTemplate"
                                   [deleteButtonTemplate]="deleteButtonTemplate"
                                   [refreshButtonTemplate]="refreshButtonTemplate">
               </crud-table-buttons>`
})
export class StockCatalystEventTableButtonsComponent
{
}
