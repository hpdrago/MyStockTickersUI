import { Component } from "@angular/core";
import { StockToBuy } from "../../model/entity/stock-to-buy";
import { CrudTableComponent } from "../crud/table/crud-table.component";
import { ToastsManager } from "ng2-toastr";
import { StockToBuyCrudServiceContainer } from "./stock-to-buy-crud-service-container";
import { StockUrlMap } from "../../common/stock-url-map";
import { isNullOrUndefined } from "util";

/**
 * This component lists all stock notes
 *
 * Created by mike on 10/30/2016.
 */
@Component(
    {
        selector:    'stock-to-buy-table',
        styleUrls:   ['./stock-to-buy-table.component.css'],
        templateUrl: './stock-to-buy-table.component.html'
    } )
export class StockToBuyTableComponent extends CrudTableComponent<StockToBuy>
{
    private urlMap: StockUrlMap = new StockUrlMap();
    constructor( protected toaster: ToastsManager,
                 protected StockToBuyServiceContainer: StockToBuyCrudServiceContainer )
    {
        super( toaster, StockToBuyServiceContainer );
    }

    /**
     * This method is called after model objects have been loaded form the database.
     * @param {StockToBuy[]} modelObjects
     * @returns {any}
     */
    protected onTableLoad( modelObjects: StockToBuy[] ): any
    {
        this.urlMap.extractURLsFromNotes( modelObjects );
        return super.onTableLoad( modelObjects );
    }


    private getRowStyleClass( rowData: [StockToBuy], rowIndex: number ): string
    {
        if ( isNullOrUndefined( rowData ))
        {
            return "";
        }
        else
        {
            if ( rowData[rowIndex].buySharesBelow < rowData[rowIndex].lastPrice )
            {
                return 'buy';
            }
            else
            {
                return 'wait';
            }
        }
    }
}
