import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockToBuyCrudServiceContainer } from "./stock-to-buy-crud-service-container";
import { CrudTableButtonsComponent } from "../crud/table/crud-table-buttons.component";
import { StockToBuy } from "../../model/entity/stock-to-buy";

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector:    'stock-to-buy-table-buttons',
    styleUrls:   ['../crud/table/crud-table-buttons.component.css'],
    templateUrl: '../crud/table/crud-table-buttons.component.html'
})
export class StockToBuyTableButtonsComponent extends CrudTableButtonsComponent<StockToBuy>
{
    constructor( protected toaster: ToastsManager,
                 protected stockToBuyServiceContainer: StockToBuyCrudServiceContainer )
    {
        super( toaster, stockToBuyServiceContainer );
    }


    protected getAddButtonLabel(): string
    {
        return "Add Stock To Buy";
    }

    protected getDeleteButtonLabel(): string
    {
        return "Delete Stock To Buy";
    }

}
