import { Component } from "@angular/core";

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector: 'stock-analyst-consensus-table-buttons',
    template: `<ng-template #addButtonTemplate>
                    <stock-analyst-consensus-table-add-button>
                    </stock-analyst-consensus-table-add-button>
               </ng-template>
               <ng-template #editButtonTemplate>
                    <stock-analyst-consensus-table-edit-button>
                    </stock-analyst-consensus-table-edit-button>
               </ng-template>
               <ng-template #deleteButtonTemplate>
                    <stock-analyst-consensus-table-delete-button>
                    </stock-analyst-consensus-table-delete-button>
               </ng-template>
               <ng-template #refreshButtonTemplate>
                    <stock-analyst-consensus-table-refresh-button>
                    </stock-analyst-consensus-table-refresh-button>
               </ng-template>
               <ng-template #customizeButtonTemplate>
                   <stock-analyst-consensus-table-customize-button>
                   </stock-analyst-consensus-table-customize-button>
               </ng-template>
               <crud-table-buttons [addButtonTemplate]="addButtonTemplate"
                                   [editButtonTemplate]="editButtonTemplate"
                                   [deleteButtonTemplate]="deleteButtonTemplate"
                                   [refreshButtonTemplate]="refreshButtonTemplate"
                                   [customizeButtonTemplate]="customizeButtonTemplate">
               </crud-table-buttons>`
})
export class StockAnalystConsensusTableButtonsComponent
{
}
