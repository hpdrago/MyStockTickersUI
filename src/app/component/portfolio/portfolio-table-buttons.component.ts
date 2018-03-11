import { Component } from "@angular/core";

/**
 * Created by mike on 1/2/2017.
 */
@Component({
    selector:    'portfolio-table-buttons',
    styleUrls:   ['./portfolio-table-buttons.component.css'],
    template: `<ng-template #addButtonTemplate>
                    <portfolio-table-add-button>
                    </portfolio-table-add-button>
               </ng-template>
               <ng-template #editButtonTemplate>
                    <portfolio-table-edit-button>
                    </portfolio-table-edit-button>
               </ng-template>
               <ng-template #deleteButtonTemplate>
                    <portfolio-table-delete-button>
                    </portfolio-table-delete-button>
               </ng-template>
               <ng-template #refreshButtonTemplate>
                    <portfolio-table-refresh-button>
                    </portfolio-table-refresh-button>
               </ng-template>
               <crud-table-buttons [addButtonTemplate]="addButtonTemplate"
                                   [editButtonTemplate]="editButtonTemplate"
                                   [deleteButtonTemplate]="deleteButtonTemplate"
                                   [refreshButtonTemplate]="refreshButtonTemplate">
               </crud-table-buttons>`
})
export class PortfolioTableButtonsComponent
{
}
