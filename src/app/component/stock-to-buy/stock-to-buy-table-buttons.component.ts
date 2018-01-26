import { Component } from "@angular/core";
import { CrudTableButtonsBaseComponent } from '../crud/table/crud-table-buttons-base.component';

/**
 * Stock to buy table buttons.
 * Created by mike on 8/15/2017.
 */
@Component({
    selector:  'stock-to-buy-table-buttons',
    template: `<ng-template #addButtonTemplate>
                    <stock-to-buy-table-add-button>
                    </stock-to-buy-table-add-button>
               </ng-template>
               <ng-template #editButtonTemplate>
                    <stock-to-buy-table-edit-button>
                    </stock-to-buy-table-edit-button>
               </ng-template>
               <ng-template #deleteButtonTemplate>
                    <stock-to-buy-table-delete-button>
                    </stock-to-buy-table-delete-button>
               </ng-template>
               <ng-template #refreshButtonTemplate>
                    <stock-to-buy-table-refresh-button>
                    </stock-to-buy-table-refresh-button>
               </ng-template>
               <crud-table-buttons [addButtonTemplate]="addButtonTemplate"
                                   [editButtonTemplate]="editButtonTemplate"
                                   [deleteButtonTemplate]="deleteButtonTemplate"
                                   [refreshButtonTemplate]="refreshButtonTemplate"
                                   [includeCustomizeButton]="includeCustomizeButton">
               </crud-table-buttons>`
})
export class StockToBuyTableButtonsComponent extends CrudTableButtonsBaseComponent
{
}
