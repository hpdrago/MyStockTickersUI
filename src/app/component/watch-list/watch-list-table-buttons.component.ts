import { Component } from "@angular/core";
import { CrudTableButtonsBaseComponent } from '../crud/table/crud-table-buttons-base.component';

/**
 * Stock to buy table buttons.
 * Created by mike on 8/15/2017.
 */
@Component({
    selector:  'watch-list-table-buttons',
    template: `<ng-template #addButtonTemplate>
                    <watch-list-table-add-button>
                    </watch-list-table-add-button>
               </ng-template>
               <ng-template #editButtonTemplate>
                    <watch-list-table-edit-button>
                    </watch-list-table-edit-button>
               </ng-template>
               <ng-template #deleteButtonTemplate>
                    <watch-list-table-delete-button>
                    </watch-list-table-delete-button>
               </ng-template>
               <ng-template #refreshButtonTemplate>
                    <watch-list-table-refresh-button>
                    </watch-list-table-refresh-button>
               </ng-template>
               <crud-table-buttons [addButtonTemplate]="addButtonTemplate"
                                   [editButtonTemplate]="editButtonTemplate"
                                   [deleteButtonTemplate]="deleteButtonTemplate"
                                   [refreshButtonTemplate]="refreshButtonTemplate"
                                   [includeCustomizeButton]="includeCustomizeButton">
               </crud-table-buttons>`
})
export class WatchListTableButtonsComponent extends CrudTableButtonsBaseComponent
{
}
