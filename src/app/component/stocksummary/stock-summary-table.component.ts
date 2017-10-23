import { Component } from "@angular/core";
import { StockSummary } from "../../model/entity/stock-summary";
import { CrudTableComponent } from "../crud/table/crud-table.component";
import { ToastsManager } from "ng2-toastr";
import { StockSummaryCrudServiceContainer } from "./stock-summary-crud-service-container";

/**
 * This component lists all stock notes
 *
 * Created by mike on 10/30/2016.
 */
@Component(
    {
        selector: 'stock-summary-table',
        styleUrls: ['./stock-summary-table.component.css'],
        templateUrl: './stock-summary-table.component.html'
    } )
export class StockSummaryTableComponent extends CrudTableComponent<StockSummary>
{
    constructor( protected toaster: ToastsManager,
                 protected StockSummaryServiceContainer: StockSummaryCrudServiceContainer )
    {
        super( toaster, StockSummaryServiceContainer );
    }

    /**
     * This method is called automatically by the base class
     */
    protected loadTable()
    {
        this.log( "loadTable.begin" );
        this.StockSummaryServiceContainer
            .stockSummaryCrudService
            .getModelObjectList( this.modelObject )
            .subscribe( ( stockSummaryList: StockSummary[] ) =>
                        {
                            if ( stockSummaryList.length > 0 )
                            {
                                /*
                                 * Expand the rows by creating new StockSummary entries for each stock of the stock note
                                 */
                                this.rows = stockSummaryList;
                                this.debug( JSON.stringify( this.rows ));
                            }
                            else
                            {
                                this.rows = [];
                            }
                            this.debug( "loadStockSummary.end" );
                        },
                        error =>
                        {
                            this.reportRestError( error );
                        } );
        this.log( "loadTable.end" );
    }

}
