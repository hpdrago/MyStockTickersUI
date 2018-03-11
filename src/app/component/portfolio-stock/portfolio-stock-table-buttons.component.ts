import { Component, Input } from "@angular/core";
import { InputHandler } from 'ng2-currency-mask/src/input.handler';
import { Portfolio } from '../../model/entity/portfolio';

/**
 * Created by mike on 1/2/2017.
 */
@Component({
    selector: 'portfolio-stock-table-buttons',
    template: `<ng-template #addButtonTemplate>
                   <portfolio-stock-table-add-button>
                   </portfolio-stock-table-add-button>
               </ng-template>
               <ng-template #editButtonTemplate>
                   <portfolio-stock-table-edit-button>
                   </portfolio-stock-table-edit-button>
               </ng-template>
               <ng-template #deleteButtonTemplate>
                   <portfolio-stock-table-delete-button>
                   </portfolio-stock-table-delete-button>
               </ng-template>
               <ng-template #refreshButtonTemplate>
                   <portfolio-stock-table-refresh-button>
                   </portfolio-stock-table-refresh-button>
               </ng-template>
               <crud-table-buttons [addButtonTemplate]="addButtonTemplate"
                                   [editButtonTemplate]="editButtonTemplate"
                                   [deleteButtonTemplate]="deleteButtonTemplate"
                                   [refreshButtonTemplate]="refreshButtonTemplate">
               </crud-table-buttons>`
})
export class PortfolioStockTableButtonsComponent
{
    @Input()
    private portfolio: Portfolio;
}

