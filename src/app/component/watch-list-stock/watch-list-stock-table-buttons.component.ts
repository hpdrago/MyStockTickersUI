import { Component } from "@angular/core";
import { CrudTableButtonsBaseComponent } from '../crud/table/crud-table-buttons-base.component';

/**
 * Stock to buy table buttons.
 * Created by mike on 8/15/2017.
 */
@Component({
    selector:  'watch-list-stock-table-buttons',
    template: `<ng-template #addButtonTemplate>
                    <watch-list-stock-table-add-button>
                    </watch-list-stock-table-add-button>
               </ng-template>
               <ng-template #editButtonTemplate>
                    <watch-list-stock-table-edit-button>
                    </watch-list-stock-table-edit-button>
               </ng-template>
               <ng-template #deleteButtonTemplate>
                    <watch-list-stock-table-delete-button>
                    </watch-list-stock-table-delete-button>
               </ng-template>
               <ng-template #refreshButtonTemplate>
                    <watch-list-stock-table-refresh-button>
                    </watch-list-stock-table-refresh-button>
               </ng-template>
               <crud-table-buttons [addButtonTemplate]="addButtonTemplate"
                                   [editButtonTemplate]="editButtonTemplate"
                                   [deleteButtonTemplate]="deleteButtonTemplate"
                                   [refreshButtonTemplate]="refreshButtonTemplate"
                                   [includeCustomizeButton]="includeCustomizeButton">
               </crud-table-buttons>`
})
export class WatchListStockTableButtonsComponent extends CrudTableButtonsBaseComponent
{
}
