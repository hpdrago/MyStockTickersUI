import { Component } from "@angular/core";
import { StockToBuy } from "../../model/entity/stock-to-buy";
import { CrudTableComponent } from "../crud/table/crud-table.component";
import { ToastsManager } from "ng2-toastr";
import { StockToBuyCrudServiceContainer } from "./stock-to-buy-crud-service-container";

/**
 * This component lists all stock notes
 *
 * Created by mike on 10/30/2016.
 */
@Component(
    {
        selector: 'stock-to-buy-table',
        templateUrl: './stock-to-buy-table.component.html'
    } )
export class StockToBuyTableComponent extends CrudTableComponent<StockToBuy>
{
    constructor( protected toaster: ToastsManager,
                 protected StockToBuyServiceContainer: StockToBuyCrudServiceContainer )
    {
        super( toaster, StockToBuyServiceContainer );
    }

}
