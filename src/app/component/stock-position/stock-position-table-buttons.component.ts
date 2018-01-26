import { Component } from "@angular/core";

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector: 'stock-position-table-buttons',
    template: `<ng-template #refreshButtonTemplate>
                    <stock-position-table-refresh-button>
                    </stock-position-table-refresh-button>
               </ng-template>
               <crud-table-buttons [refreshButtonTemplate]="refreshButtonTemplate">
               </crud-table-buttons>`
})
export class StockPositionTableButtonsComponent
{
}
